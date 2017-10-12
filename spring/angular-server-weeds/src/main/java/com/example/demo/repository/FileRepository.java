package com.example.demo.repository;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.demo.domain.File;

public interface FileRepository {
	public int insertFile(MultipartFile file);
	public int insertFile(String s, MultipartFile file);
	public List<String> selectAll();
//	public List<File> selectAll();
}
