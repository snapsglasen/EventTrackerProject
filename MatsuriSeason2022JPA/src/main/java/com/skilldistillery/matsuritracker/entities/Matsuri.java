package com.skilldistillery.matsuritracker.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Matsuri {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int id;
	
	private String name;
	
	private String reason;
	
	private String food;
	
	private String date;
	
	private boolean presents;

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getFood() {
		return food;
	}

	public void setFood(String food) {
		this.food = food;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public boolean isPresents() {
		return presents;
	}

	public void setPresents(boolean presents) {
		this.presents = presents;
	}

	@Override
	public String toString() {
		return "Matsuri [id=" + id + ", name=" + name + ", reason=" + reason + ", food=" + food + ", date=" + date
				+ ", presents=" + presents + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Matsuri() {
		super();
	}
	
	
	
}
