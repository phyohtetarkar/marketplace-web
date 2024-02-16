"use client";
import ChangePassword from "./ChangePassword";
import ProfileUpdate from "./ProfileUpdate";

function SettingPage() {
  return (
    <div className="card">
      <div className="card-body p-md-4">
        <ProfileUpdate />
        <hr className="bg-dark-gray" />
        <ChangePassword />
      </div>
    </div>
  );
}

export default SettingPage;
