// @ts-nocheck
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AdminAuthContext = createContext(null);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load token and admin data from localStorage on initial boot
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("najjo_admin_token");
      const storedAdmin = localStorage.getItem("najjo_admin_user");

      if (storedToken && storedAdmin) {
        setToken(storedToken);
        setAdmin(JSON.parse(storedAdmin));
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      }
    } catch (err) {
      console.error("Error reading admin auth cache:", err);
      localStorage.removeItem("najjo_admin_token");
      localStorage.removeItem("najjo_admin_user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        email,
        password
      });

      if (response.data?.success && response.data?.token) {
        const receivedToken = response.data.token;
        const receivedAdmin = response.data.admin;

        setToken(receivedToken);
        setAdmin(receivedAdmin);

        localStorage.setItem("najjo_admin_token", receivedToken);
        localStorage.setItem("najjo_admin_user", JSON.stringify(receivedAdmin));
        axios.defaults.headers.common["Authorization"] = `Bearer ${receivedToken}`;

        router.push("/admin/dashboard");
        return { success: true, admin: receivedAdmin };
      } else {
        return {
          success: false,
          message: response.data?.message || "লগইন ব্যর্থ হয়েছে"
        };
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "সার্ভারে সংযোগ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
      return { success: false, message: msg };
    }
  };

  // Register handler
  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/register`, {
        name,
        email,
        password
      });

      if (response.data?.success && response.data?.token) {
        const receivedToken = response.data.token;
        const receivedAdmin = response.data.admin;

        setToken(receivedToken);
        setAdmin(receivedAdmin);

        localStorage.setItem("najjo_admin_token", receivedToken);
        localStorage.setItem("najjo_admin_user", JSON.stringify(receivedAdmin));
        axios.defaults.headers.common["Authorization"] = `Bearer ${receivedToken}`;

        router.push("/admin/dashboard");
        return { success: true, admin: receivedAdmin };
      } else {
        return {
          success: false,
          message: response.data?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে"
        };
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "সার্ভারে সংযোগ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
      return { success: false, message: msg };
    }
  };

  // Logout handler
  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem("najjo_admin_token");
    localStorage.removeItem("najjo_admin_user");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/admin/login");
  };

  // Axios helper with Auth headers
  const authAxios = axios.create({
    baseURL: API_BASE_URL
  });

  authAxios.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle 401 token expiry automatically
  authAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token,
        isMasterAdmin: admin?.role === 'MASTER_ADMIN',
        isLoading,
        login,
        register,
        logout,
        authAxios,
        apiBaseUrl: API_BASE_URL
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
