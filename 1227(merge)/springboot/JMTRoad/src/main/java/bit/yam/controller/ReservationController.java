package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.config.Reservation;
import bit.yam.mapper.ReservationService;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/reserve")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public Reservation saveUser(@RequestBody Reservation user){
        return reservationService.save(user);
    }

    @GetMapping
    public List<Reservation> listUser(){
        return reservationService.findAll();
    }
    
    @GetMapping("/{reservationNO}")
    public Reservation getOne(@PathVariable int reservationNO){
        return reservationService.findById(reservationNO);
    }
    

    @DeleteMapping("/{reservationNO}")
    public void delete(@PathVariable int reservationNO) {
    	reservationService.delete(reservationNO);
    }



}
