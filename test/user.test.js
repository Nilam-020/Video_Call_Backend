// use the path of your model
const mongoose = require('mongoose');
const Patient = require('../models/userModel');
const Doctor = require('../models/DoctorModel');
const Schedule = require('../models/ScheduleModel');
const Staff = require('../models/staffModel');
const Appointment = require('../models/appointmentModel')
const Rating = require('../models/ratingModel')
const { italic } = require('colors');
// use the new name of the database
const url = 'mongodb://localhost:27017/appointmentBooking_Api';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
describe('User Testing', () => {
    // the code below is for insert testing
    it('User Registration', () => {
        const user = {
            'firstname': 'Anil',
            'lastname': 'Dahal',
            'address': 'jorpati',
            'date_of_birth': '2002-05-25',
            'email': 'anil@gmail.com',
            'gender': 'Male',
            'phone': '9843717171',
            'password': '9853717171'
        };
        return Patient.create(user)
            .then((pro_ret) => {
                expect(pro_ret.firstname).toEqual('Anil');
            });
    });

    //doctor registration
    it('Doctor Registration', () => {
        const doctor = {
            'profile': "",
            'firstname': 'Ashish',
            'lastname': 'Sharma',
            'address': 'jorpati',
            'department': 'Neurology',
            'nmc': '1201345',
            'email': 'anil@gmail.com',
            'gender': 'Male',
            'phone': '9843717123',
            'password': '9853717132',
            'worked': 'Bir Hospital'
        };
        return Doctor.create(doctor)
            .then((pro_ret) => {
                expect(pro_ret.firstname).toEqual('Ashish');
            });
    });

    //staff registration
    it('Admin Registration', () => {
        const admin = {
            'firstname': 'kaushal',
            'lastname': 'Bhatta',
            'address': 'Samakhusi',
            'date_of_birth': '1995-05-30',
            'position': 'HR',
            'email': 'kaushal.bhatta@gmail.com',
            'gender': 'Male',
            'phone': '9843717112',
            'password': '9853717123',
            'user_type': 'Staff'
        };

        return Staff.create(admin)
            .then((admin_reg) => {
                expect(admin_reg.user_type).toEqual('Staff');
            });
    });

    //appointment schedule add
    it('Add Appointment', () => {
        const appointment = {
            DocID: "607e8e14032532378c1168e2",
            startdate: new Date(),
            enddate: new Date(),
            startTime: "11",
            endTime: "17",
            created_Date: new Date()
        };

        return Schedule.create(appointment)
            .then((schedule_add) => {
                expect(appointment.DocID).toEqual('607e8e14032532378c1168e2');
            });
    });

    // the code below is for delete testing
    it('to test the delete product is working or not', async () => {
        const status = await Appointment.deleteOne({ "_id": "607e8214df82ed3168335d4e" });
        expect(status.ok).toBe(1);
    });
    it('to test the update', async () => {
        var status = await Patient.updateOne({
            "_id": "607e5b0c0908312db00a0f74"
        },
            {
                $set: {
                    "firstname": "Ashish"
                }
            })

        expect(status.ok).toBe(1)
    });



    it("ratedoctor", () => {
        const rating = {
            DocID: "607e8e14032532378c1168e2",
            UID: "607e5b0c0908312db00a0f74",
            rating: 5
        }

        return Rating.create(rating).then((ratings) => {
            expect(ratings.rating).toEqual(5);
        })
    })

    //delete doctor
    it("delete doctor", async () => {
        var status = await Doctor.deleteOne({ "_id": "607e8e14032532378c1168e2" });
        expect(status.ok).toBe(1)
    })
})