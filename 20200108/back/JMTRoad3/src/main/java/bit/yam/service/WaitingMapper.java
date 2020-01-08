package bit.yam.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.bean.Waiting;

@Mapper
public interface WaitingMapper {
	
	void savewait(Waiting user);
	int countwaiting(int ownerNo);
	List<Waiting> waitingList(int ownerNo);
	void deletewaiting(int waitNO);
	
	int waitingone(int waitNo);
	int Noshow(int userNo);
}
