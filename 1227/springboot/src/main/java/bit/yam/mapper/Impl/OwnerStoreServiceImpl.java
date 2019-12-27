package bit.yam.mapper.Impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import bit.yam.bean.OwnerStoreDao;
import bit.yam.config.OwnerStore;
import bit.yam.mapper.OwnerStoreService;

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

	@Override
	public void delete(int ownerNo) {
		ownerdao.deleteById(ownerNo);
	}

	@Override
	public OwnerStore findById(int ownerNo) {
		Optional<OwnerStore> optionalUser = ownerdao.findById(ownerNo);
		return optionalUser.isPresent() ? optionalUser.get() : null;
	}

	@Override
	public OwnerStore findByOne(String stName) {
		return null;
	}

	@Override
	public OwnerStore save(OwnerStore ownerstore,MultipartFile file) {

		String filename=ownerstore.getMenuImg();
		
		OwnerStore newowner = new OwnerStore();
		 
		 System.out.println("filename  :::"+filename);
		
		 String filename1 = filename.replace("C:\\fakepath\\", "file:///E:/upload/");
		 
		 System.out.println("filename1  :::"+filename1);
		 
		 newowner.setStName(ownerstore.getStName());
		 newowner.setLoc(ownerstore.getLoc());
		 newowner.setTel(ownerstore.getTel());
		 newowner.setMenuImg(filename1);
		 newowner.setFoodstyle(ownerstore.getFoodstyle());
		 newowner.setMainMenu(ownerstore.getMainMenu());
		 newowner.setOctime(ownerstore.getOctime());
		 
		return ownerdao.save(newowner);
		
	}

}
