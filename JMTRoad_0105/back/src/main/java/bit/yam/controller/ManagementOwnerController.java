package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.bean.OwnerVO;
import bit.yam.service.ManagementOwnerMapper;

@RestController
public class ManagementOwnerController {

	@Autowired
	private ManagementOwnerMapper managementOwnerMapper;
	
	@GetMapping("ownerStoreList")
	public List<OwnerVO> ownerStoreList(){
		List<OwnerVO> list = managementOwnerMapper.ownerStoreList();
		return list;
	}
}
