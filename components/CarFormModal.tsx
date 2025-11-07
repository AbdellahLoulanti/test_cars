import React, { useState } from 'react';
import { Car, CarCategory, CarType } from '../types';
import { CloseIcon } from './IconComponents';

interface CarFormModalProps {
    car: Car | null;
    onClose: () => void;
    onSave: (carData: any) => void;
}

const carCategories: CarCategory[] = ['Luxury', 'Sport', 'Electric', 'SUV'];
const carTypes: CarType[] = ['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Convertible'];
const transmissionTypes = ['Automatic', 'Manual'];
const fuelTypes = ['Gasoline', 'Electric', 'Hybrid'];

const CarFormModal: React.FC<CarFormModalProps> = ({ car, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        make: car?.make || '',
        model: car?.model || '',
        year: car?.year || new Date().getFullYear(),
        category: car?.category || 'Luxury',
        type: car?.type || 'Sedan',
        seats: car?.seats || 4,
        transmission: car?.transmission || 'Automatic',
        fuelType: car?.fuelType || 'Gasoline',
        pricePerDay: car?.pricePerDay || 200,
        imageUrl: car?.imageUrl || 'https://picsum.photos/seed/newcar/800/600',
        features: car?.features?.join(', ') || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const carData = {
            ...formData,
            year: Number(formData.year),
            seats: Number(formData.seats),
            pricePerDay: Number(formData.pricePerDay),
            features: formData.features.split(',').map(f => f.trim()),
        };
        
        if (car) {
             onSave({ ...car, ...carData });
        } else {
             onSave(carData);
        }
        onClose();
    };

    const Input = ({ name, label, type = "text", ...props }: any) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <input id={name} name={name} type={type} {...props} onChange={handleChange} value={formData[name]} className="w-full bg-brand-gray-light border-brand-gray-light rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-brand-blue focus:outline-none" required />
        </div>
    );
    
    const Select = ({ name, label, children }: any) => (
         <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <select id={name} name={name} onChange={handleChange} value={formData[name]} className="w-full bg-brand-gray-light border-brand-gray-light rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-brand-blue focus:outline-none">
                {children}
            </select>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-brand-gray-dark rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-brand-gray-light sticky top-0 bg-brand-gray-dark">
                    <h2 className="text-xl font-bold">{car ? 'Edit Car' : 'Add New Car'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-brand-gray-light">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input name="make" label="Make" placeholder="e.g., Porsche"/>
                        <Input name="model" label="Model" placeholder="e.g., 911 Carrera"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input name="year" label="Year" type="number" />
                        <Input name="pricePerDay" label="Price per Day ($)" type="number"/>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select name="category" label="Category">
                            {carCategories.map(c => <option key={c} value={c}>{c}</option>)}
                        </Select>
                         <Select name="type" label="Type">
                            {carTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input name="seats" label="Seats" type="number" />
                        <Select name="transmission" label="Transmission">
                            {transmissionTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </Select>
                        <Select name="fuelType" label="Fuel Type">
                             {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
                        </Select>
                    </div>
                    <div>
                        <Input name="imageUrl" label="Image URL" />
                    </div>
                     <div>
                        <label htmlFor="features" className="block text-sm font-medium text-gray-300 mb-1">Features (comma-separated)</label>
                        <textarea id="features" name="features" rows={3} onChange={handleChange} value={formData.features} className="w-full bg-brand-gray-light border-brand-gray-light rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-brand-blue focus:outline-none" placeholder="e.g., Leather Seats, Bose Sound System"></textarea>
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-brand-gray-light text-white font-semibold py-2 px-5 rounded-lg hover:bg-brand-gray transition-colors">Cancel</button>
                        <button type="submit" className="bg-brand-blue text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-600 transition-colors">{car ? 'Save Changes' : 'Add Car'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CarFormModal;
