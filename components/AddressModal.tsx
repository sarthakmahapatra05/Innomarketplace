"use client";

import React, { useState } from "react";
import { X, MapPin, Plus, Check, Home, Briefcase, Building } from "lucide-react";
import { Address } from "@/data/products";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: Address[];
  currentAddressId: string;
  onSelectAddress: (address: Address) => void;
  onAddNewAddress: (address: Omit<Address, "id">) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  addresses,
  currentAddressId,
  onSelectAddress,
  onAddNewAddress,
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    street: "",
    city: "",
    tag: "Home" as "Home" | "Work" | "Other",
  });

  if (!isOpen) return null;

  const handleSubmitNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.street || !formData.pincode) return;

    onAddNewAddress({
      name: formData.name,
      phone: formData.phone || "+91 98765 43210",
      street: formData.street,
      city: formData.city || "New Delhi",
      pincode: formData.pincode,
      tag: formData.tag,
      isDefault: false,
    });
    setIsAddingNew(false);
    setFormData({
      name: "",
      phone: "",
      pincode: "",
      street: "",
      city: "",
      tag: "Home",
    });
  };

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case "Home":
        return <Home className="w-3.5 h-3.5" />;
      case "Work":
        return <Briefcase className="w-3.5 h-3.5" />;
      default:
        return <Building className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 text-sm sm:text-base">
                Delivery Addresses
              </h3>
              <p className="text-xs text-zinc-500">
                Choose where you want your order delivered
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-zinc-700"
            aria-label="Close addresses"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {!isAddingNew ? (
            <>
              <div className="space-y-3">
                {addresses.map((addr) => {
                  const isSelected = addr.id === currentAddressId;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => {
                        onSelectAddress(addr);
                        onClose();
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between ${
                        isSelected
                          ? "border-[#a82046] bg-rose-50/40 ring-1 ring-[#a82046]"
                          : "border-zinc-200 hover:border-zinc-300 bg-white"
                      }`}
                    >
                      <div className="flex-1 pr-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 font-semibold text-[11px]">
                            {getTagIcon(addr.tag)}
                            <span>{addr.tag}</span>
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-zinc-900">
                            {addr.name}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 leading-relaxed">
                          {addr.street}, {addr.city} - <span className="font-semibold text-zinc-800">{addr.pincode}</span>
                        </p>
                        <p className="text-xs text-zinc-400 mt-1">
                          Phone: {addr.phone}
                        </p>
                      </div>

                      <div className="mt-1">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? "border-[#a82046] bg-[#a82046] text-white"
                              : "border-zinc-300"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full py-3 border-2 border-dashed border-zinc-200 hover:border-[#a82046] text-[#a82046] rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add New Address</span>
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmitNewAddress} className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <span className="text-xs font-bold text-zinc-700">Add New Delivery Address</span>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-xs text-[#a82046] font-semibold"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarthak Sharma"
                  className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-xl focus:outline-none focus:border-[#a82046]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="98765 43210"
                    className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-xl focus:outline-none focus:border-[#a82046]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="201301"
                    className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-xl focus:outline-none focus:border-[#a82046]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                  Street, Flat, Landmark
                </label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="Tower B, Flat 402, Sector 78"
                  className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-xl focus:outline-none focus:border-[#a82046]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Noida"
                    className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-xl focus:outline-none focus:border-[#a82046]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                    Address Tag
                  </label>
                  <select
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-xl focus:outline-none focus:border-[#a82046]"
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-[#a82046] hover:bg-[#8e1739] text-white font-bold text-xs rounded-xl transition-all shadow-md"
              >
                Save &amp; Select Address
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
