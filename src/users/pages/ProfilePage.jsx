import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getProfile } from "../services/userService";
import "../../styles/profile.css";

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (err) {
                console.error(err);
                setError("Unable to load profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <Layout>
            <div className="profile-page">
                <div className="profile-header">
                    <div>
                        <p className="profile-label">Profile</p>
                        <h1>Account Details</h1>
                        <p className="profile-subtitle">
                            Review your account information and permissions.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="profile-empty">Loading profile...</div>
                ) : error ? (
                    <div className="profile-empty">{error}</div>
                ) : (
                    <div className="profile-card">
                        <div className="profile-row">
                            <span>Name</span>
                            <strong>{profile.name}</strong>
                        </div>
                        <div className="profile-row">
                            <span>Email</span>
                            <strong>{profile.email}</strong>
                        </div>
                        <div className="profile-row">
                            <span>Role</span>
                            <strong>{profile.role}</strong>
                        </div>
                        <div className="profile-row">
                            <span>Joined</span>
                            <strong>{new Date(profile.createdAt).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}</strong>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default ProfilePage;
