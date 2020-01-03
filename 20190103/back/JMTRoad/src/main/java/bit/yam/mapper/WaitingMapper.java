package bit.yam.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.config.Waiting;

@Mapper
public interface WaitingMapper {
	
	void savewait(Waiting user);
	int countwaiting(int ownerNo);
	List<Waiting> waitingList(int ownerNo);
	
}
