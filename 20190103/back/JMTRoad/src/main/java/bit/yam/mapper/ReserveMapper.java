package bit.yam.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.config.Reservation;
//import bit.yam.config.Reservation_haha;

@Mapper
public interface ReserveMapper {

	List<Reservation> ReserveList(int ownerNo, String regdate);
	void saveReserve(Reservation reserve);
	
	
	int countreservation(int ownerNo,String regdate);
	
	
	List<Reservation> requestreservation(int ownerNo);
	int countrequestreservation(int ownerNo);
	
	void rejectreservation(int reservationNO);
	void acceptreservation(int reservationNO);
}
