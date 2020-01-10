package bit.yam.service;

import java.util.List;

import bit.yam.bean.Reservation;

public interface ReservationService {

	Reservation save(Reservation user);
	List<Reservation> findAll();
	void delete(int reservationNO);
	
	Reservation findById(int reservationNO);

}
