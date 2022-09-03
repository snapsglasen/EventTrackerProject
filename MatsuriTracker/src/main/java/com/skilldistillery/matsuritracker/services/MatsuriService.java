package com.skilldistillery.matsuritracker.services;

import java.util.List;

import com.skilldistillery.matsuritracker.entities.Matsuri;

public interface MatsuriService {
	List<Matsuri> matsuris();
	
	Matsuri findById(int id);
	
	Matsuri create(Matsuri matsuri);
	
	Matsuri update(Matsuri matsuri, int id);
	
	boolean delete(int id);
}
