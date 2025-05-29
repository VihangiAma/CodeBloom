import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

export default function Appointment() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        vehicleType: "",
        phone: "",
        vehicleNumber: "",
        date: "",
        time: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/", { replace: true });
        console.log("Appointment submitted:", formData);
        setFormData({
            name: "",
            address: "",
            vehicleType: "",
            phone: "",
            vehicleNumber: "",
            date: "",
            time: "",
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        setFormData({
            name: "",
            address: "",
            vehicleType: "",
            phone: "",
            vehicleNumber: "",
            date: "",
            time: "",
        });
        navigate("/", { replace: true });
    };

    // Generate dates for the next 7 days
    const getDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date.toISOString().split("T")[0]);
        }
        return dates;
    };

    // Generate time slots from 8:00 AM to 6:00 PM (hourly)
    const getTimes = () => {
        const times = [];
        for (let hour = 8; hour <= 18; hour++) {
            const time = `${hour.toString().padStart(2, "0")}:00`;
            times.push(time);
        }
        return times;
    };

    const dates = getDates();
    const times = getTimes();

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 py-24 px-4 sm:px-6 lg:px-8">
                <div className="form-box max-w-md w-full bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Book Your Appointment</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-800 mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-800 mb-1">
                                Vehicle Type
                            </label>
                            <select
                                id="vehicleType"
                                name="vehicleType"
                                value={formData.vehicleType}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                <option value="">Select Vehicle Type</option>
                                <option value="Car">Car</option>
                                <option value="Van">Van</option>
                                <option value="SUV">SUV</option>
                                <option value="Truck">Truck</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-1">
                                Telephone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-800 mb-1">
                                Vehicle Number
                            </label>
                            <input
                                type="text"
                                id="vehicleNumber"
                                name="vehicleNumber"
                                value={formData.vehicleNumber}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-800 mb-1">
                                Select Date
                            </label>
                            <select
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                <option value="">Select Date</option>
                                {dates.map((date) => (
                                    <option key={date} value={date}>
                                        {new Date(date).toLocaleDateString()}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-800 mb-1">
                                Select Time
                            </label>
                            <select
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                <option value="">Select Time</option>
                                {times.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm uppercase tracking-wide font-medium hover:bg-red-500 transition-colors duration-200 flex-1"
                            >
                                Confirm
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm uppercase tracking-wide font-medium hover:bg-gray-400 transition-colors duration-200 flex-1"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}