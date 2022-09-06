package com.skilldistillery.matsuritracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.matsuritracker.entities.Matsuri;
import com.skilldistillery.matsuritracker.repositories.MatsuriRepository;

@Service
public class MatsuriServiceImpl implements MatsuriService {

	@Autowired
	private MatsuriRepository matRepo;

	@Override
	public List<Matsuri> matsuris() {
		return matRepo.findAll();
	}

	@Override
	public Matsuri findById(int id) {
		Matsuri matsuri = null;
		Optional<Matsuri> matOp = matRepo.findById(id);
		if (matOp.isPresent()) {
			matsuri = matOp.get();
		}
		return matsuri;
	}

	@Override
	public Matsuri create(Matsuri matsuri) {

		return matRepo.saveAndFlush(matsuri);
	}

	@Override
	public Matsuri update(Matsuri matsuri, int id) {
		Matsuri existing = findById(id);
		if (existing == null) {
			return null;
		}
		existing.setName(matsuri.getName());
		existing.setDate(matsuri.getDate());
		existing.setFood(matsuri.getFood());
		existing.setReason(matsuri.getReason());
		existing.setPresents(matsuri.isPresents());
		return matRepo.saveAndFlush(existing);
	}

	@Override
	public boolean delete(int id) {
		matRepo.deleteById(id);
		return !matRepo.existsById(id);
	}

}
