"use client"

import { useState } from "react"

export default function AdminProfileSettings() {
  const [formData, setFormData] = useState({
    fullName: "Admin Name",
    email: "admin@gmail.com",
    phone: "+880xxxxxxxxxx",
    profilePhoto: null,
  })

  const [photoPreview, setPhotoPreview] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: file,
      }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    alert("Profile settings saved successfully!")
    console.log("Saved data:", formData)
  }

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Profile Settings</h1>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          {/* Personal Information Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            </div>

            {/* Full Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Email Address */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@gmail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+880xxxxxxxxxx"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Profile Photo */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">Profile Photo</label>
              <div className="flex items-center gap-3">
                <label className="px-4 py-2 bg-amber-400 text-gray-900 font-semibold rounded cursor-pointer hover:bg-amber-500 transition-colors">
                  Choose File
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
                <span className="text-gray-600">
                  {formData.profilePhoto ? formData.profilePhoto.name : "No File Chosen"}
                </span>
              </div>
              {photoPreview && (
                <div className="mt-4">
                  <img
                    src={photoPreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full px-4 py-3 bg-amber-400 text-gray-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
