package bit.yam.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.bean.Reservation;

@Mapper
public interface ReserveMapper {

	List<Reservation> ReserveList(int ownerNo, String regdate);
	void saveReserve(Reservation reserve);
	
	int countreservation(int ownerNo,String regdate);
	
	List<Reservation> requestreservation(int ownerNo);
	int countrequestreservation(int ownerNo);
	
	void rejectreservation(int reservationNO);
	void acceptreservation(int reservationNO);

	void deletereservation(int reservationNO);
	
	void Noshow(int userNO);
	
	int reserveone(int reservationNO);
	

}
