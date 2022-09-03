package com.skilldistillery.matsuritracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.matsuritracker.entities.Matsuri;

public interface MatsuriRepository extends JpaRepository<Matsuri, Integer>{

}
