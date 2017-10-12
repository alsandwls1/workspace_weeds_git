package com.example.demo.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.Member;
import com.example.demo.repository.MemberRepository;

@RestController
public class MemberController {
	@Autowired
	private MemberRepository memberRepository;

	@GetMapping("/members")
	public Object get() {
		return memberRepository.selectAll();
	}

	@PostMapping(value = { "/members" }, consumes = { MediaType.APPLICATION_JSON_VALUE })
	public String post(@RequestBody Member member) {
		try {
			memberRepository.insert(member);
			return "1";
		} catch (Exception e) {
			// TODO: handle exception
		}
		return "0";
	}

	@DeleteMapping("/members/{email}")
	public void delete(@PathVariable String email) {
		memberRepository.delete(email);
	}

	// @PostMapping(value= {"/login"} ,consumes =
	// {MediaType.APPLICATION_JSON_VALUE})
	// public boolean login(@RequestBody Member member){
	// return memberRepository.isValidUser(member);
	// }
	@RequestMapping(value = { "/members/login" }, method = RequestMethod.POST)
	public Object login1(@RequestBody Member member, HttpSession session) {
		if (memberRepository.isValidUser(member)) {
			session.setAttribute("a", member.getEmail());
			System.out.println(session.getAttribute("a"));
			return session.getAttribute("a");
		}
		return "fail";
	}

	@RequestMapping(value = { "/members/login" }, method = RequestMethod.GET)
	public Object login2(HttpSession session) {
		System.out.println(session.getAttribute("a"));
		if (session != null) {
			return session.getAttribute("a");
		}
		return null;
	}

}