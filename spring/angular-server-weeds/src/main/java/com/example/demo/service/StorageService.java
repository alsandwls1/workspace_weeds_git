package com.example.demo.service;

//package com.javasampleapproach.uploadfiles.storage;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.repository.FileRepository;

@Service
public class StorageService {

	@Autowired
	private FileRepository fileRepository;

	Logger log = LoggerFactory.getLogger(this.getClass().getName());
//	private final Path rootLocation = Paths.get("upload-dir");
	private final Path rootLocation = Paths.get("D:/uploads");

	public void store(MultipartFile file) {
		String testFileName = System.currentTimeMillis()+"_"+file.getOriginalFilename();
		
		try {
			System.out.println("3");
//			Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
//			fileRepository.insertFile(file);
			Files.copy(file.getInputStream(), this.rootLocation.resolve(testFileName));
			fileRepository.insertFile(testFileName, file);
			System.out.println("4");
		} catch (Exception e) {
			throw new RuntimeException("FAIL!");
		}
	}
	
	public List<String> getfile(){
		System.out.println(fileRepository.selectAll());
		return fileRepository.selectAll();
	}

	public Resource loadFile(String filename) {
		try {
			System.out.println("loadFile() # filename = "+filename);
			
			Path file = rootLocation.resolve(filename);
			
			System.out.println("pathfile = "+file);
			System.out.println("loadFile() # file.toUri() = "+file.toUri());
			
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				throw new RuntimeException("FAIL!");
			}
		} catch (MalformedURLException e) {
			throw new RuntimeException("FAIL!");
		}
	}

	public void deleteAll() {
		FileSystemUtils.deleteRecursively(rootLocation.toFile());
	}

	public void init() {
		try {
			Files.createDirectory(rootLocation);
		} catch (IOException e) {
			throw new RuntimeException("Could not initialize storage!");
		}
	}
}