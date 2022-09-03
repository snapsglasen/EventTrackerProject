package com.skilldistillery.matsuritracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.matsuritracker.entities.Matsuri;
import com.skilldistillery.matsuritracker.services.MatsuriService;

@RestController
@RequestMapping("api")
public class MatsuriController {

	@Autowired
	private MatsuriService matServ;

	@GetMapping("matsuris")
	public List<Matsuri> index() {
		return matServ.matsuris();
	}

	@GetMapping("matsuris/{id}")
	public Matsuri showMatsuri(@PathVariable int id, HttpServletResponse res) {
		Matsuri matsuri = matServ.findById(id);
		if (matsuri == null) {
			res.setStatus(404);
		}
		return matsuri;
	}

	@DeleteMapping("matsuris/{id}")
	public Boolean delete(@PathVariable int id, HttpServletResponse res) {
		Boolean deleted = matServ.delete(id);
		if (deleted) {
			res.setStatus(204);
		} else {
			res.setStatus(404);
		}
		return deleted;
	}

	@PostMapping("matsuris")
	public Matsuri create(@RequestBody Matsuri matsuri, HttpServletResponse res) {
		Matsuri created = null;
		try {
			created = matServ.create(matsuri);
			res.setStatus(201);
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
		return created;
	}

	@PatchMapping("matsuris/{id}")
	public Matsuri update(@RequestBody Matsuri matsuri, @PathVariable int id, HttpServletResponse res) {
		Matsuri updated = null;

		try {
			updated = matServ.update(matsuri, id);
		} catch (Exception e) {
			res.setStatus(400);
			e.printStackTrace();
		}
		return updated;
	}

}
