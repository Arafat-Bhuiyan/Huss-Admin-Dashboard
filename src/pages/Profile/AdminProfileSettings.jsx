import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../Redux/api/authApi";
import { Loader2 } from "lucide-react";

export default function AdminProfileSettings() {
  const { data: profileData, isLoading: isProfileLoading } =
    useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profilePhoto: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (profileData) {
      setFormData({
        firstName: profileData.first_name || "",
        lastName: profileData.last_name || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        profilePhoto: null,
      });
      if (profileData.picture) {
        setPhotoPreview(profileData.picture);
      }
    }
  }, [profileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("first_name", formData.firstName);
      data.append("last_name", formData.lastName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);

      if (formData.profilePhoto) {
        data.append("picture", formData.profilePhoto);
      }

      await updateProfile(data).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  if (isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Profile Settings
        </h1>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          {/* Personal Information Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <svg
                className="w-5 h-5 text-gray-700"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h2>
            </div>

            {/* Names */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter First Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter Last Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email Address
              </label>
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
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Phone Number
              </label>
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
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Profile Photo
              </label>
              <div className="flex items-center gap-3">
                <label className="px-4 py-2 bg-amber-400 text-gray-900 font-semibold rounded cursor-pointer hover:bg-amber-500 transition-colors">
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <span className="text-gray-600">
                  {formData.profilePhoto
                    ? formData.profilePhoto.name
                    : "No File Chosen"}
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
            disabled={isUpdating}
            className="w-full px-4 py-3 bg-amber-400 text-gray-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
            {isUpdating ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
