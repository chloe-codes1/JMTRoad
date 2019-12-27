package bit.yam.mapper;

import java.util.List;

import bit.yam.config.Reservation;

public interface ReservationService {

	Reservation save(Reservation user);
	List<Reservation> findAll();
	void delete(int reservationNO);

	Reservation findByOne(String uName);
	
	Reservation findById(int reservationNO);

}
