package bit.yam.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bit.yam.bean.OwnerStore;
import bit.yam.bean.OwnerStoreDao;
import bit.yam.bean.OwnerStoreDto;

/*@Transactional*/
@Service(value = "OwnerStoreService")
public class OwnerStoreServiceImpl implements OwnerStoreService {

	@Autowired
	private OwnerStoreDao ownerdao;

	public List<OwnerStore> findAll() {
		List<OwnerStore> list = new ArrayList<>();
		ownerdao.findAll().iterator().forEachRemaining(list::add);
		return list;
	}
	


//	@Override
//	public OwnerStore findById(int ownerNo) {
//		Optional<OwnerStore> optionalUser = ownerdao.findById(ownerNo);
//		return optionalUser.isPresent() ? optionalUser.get() : null;
//	}

	@Override
	public OwnerStore findByownerNo(int ownerNo) {
		
		return ownerdao.findByOwnerNo(ownerNo);
	}

	@Override
	public OwnerStore save(OwnerStore ownerstore) {
		
		OwnerStore newowner = new OwnerStore();
			
		newowner.setOwnerID(ownerstore.getOwnerID());
		newowner.setPassword(ownerstore.getPassword());
		newowner.setName(ownerstore.getName());
		newowner.setBrNo(ownerstore.getBrNo());
		
		System.out.println("음식종류"+ownerstore.getCuisine());
		
		
		return ownerdao.save(newowner);
		
	}
	
	@Override
	public OwnerStoreDto update(OwnerStoreDto ownerstoredto) {
		
		OwnerStore owner = findByownerNo(ownerstoredto.getOwnerNo());
		
		System.out.println("test");
		
		if(owner!= null) {
			
			System.out.println("음식종류 :: "+ownerstoredto.getCuisine());
			
			String a = ownerstoredto.getCuisine();
			
			if(a.equals("한식")) {
				ownerstoredto.setCuisine("51");
			}
			else if(a.equals("양식")) {
				ownerstoredto.setCuisine("52");
			}
			else if(a.equals("중식")) {
				ownerstoredto.setCuisine("53");
			}			
			else if(a.equals("일식")) {
				ownerstoredto.setCuisine("54");
			}
			else if(a.equals("동남아식")) {
				ownerstoredto.setCuisine("55");
			}
			else if(a.equals("뷔페식")) {
				ownerstoredto.setCuisine("56");
			}
			
			
			BeanUtils.copyProperties(ownerstoredto, owner);
			
			ownerdao.save(owner);
		}
		return ownerstoredto;
		

	}


}
