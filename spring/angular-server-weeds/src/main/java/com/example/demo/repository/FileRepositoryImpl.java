package com.example.demo.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.domain.File;

@Repository
public class FileRepositoryImpl implements FileRepository {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public int insertFile(MultipartFile file) {

		String sql = "insert into files (f_name, f_path) values(?, ?)";

		return jdbcTemplate.update(sql, file.getOriginalFilename(), "D:/uploads");

	}

//	@Override
//	public List<String> selectAll() {
//		List<File> fileList = null;
//		String sql = "select * from files";
//		fileList = this.jdbcTemplate.query(sql, new RowMapper<File>() {
//			public File mapRow(ResultSet rs, int rowNum) throws SQLException {
//				File file = new File();
//				file.setF_id(rs.getInt("f_id"));
//				file.setF_name(rs.getString("f_name"));
//				file.setF_path(rs.getString("f_path"));
//				return file;
//			}
//		});
//		
//		return fileList;
//	}
	
	@Override
	public List<String> selectAll() {
		List<String> fileList = null;
		String sql = "select f_name from files";
		fileList = this.jdbcTemplate.query(sql, new RowMapper() {
			public List mapRow(ResultSet rs, int rowNum) throws SQLException {
				List file = new ArrayList<>();
				file.add(rs.getString("f_name"));
				return file;
			}
		});
		
		return fileList;
	}
	
//	@Override
//	public List<File> selectAll() {
//		List<File> fileList = null;
//		String sql = "select f_name from files";
//		fileList = this.jdbcTemplate.query(sql, new RowMapper() {
//			public List mapRow(ResultSet rs, int rowNum) throws SQLException {
//				List file = new ArrayList<>();
//				file.add(rs.getString("f_name"));
//				return file;
//			}
//		});
//		
//		return fileList;
//	}
}
