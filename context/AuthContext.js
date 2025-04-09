import { createContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user data exists in AsyncStorage
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData")
        if (userData) {
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.log("Error loading user data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [])

  const login = async (email, password) => {
    try {
      const mockUser = {
        id: "123",
        name: "John Doe",
        email,
        membershipType: "Premium",
        membershipExpiry: "2024-12-31",
        visitsLeft: 20,
        totalVisits: 45,
      }

      await AsyncStorage.setItem("userToken", "dummy-auth-token")
      await AsyncStorage.setItem("userData", JSON.stringify(mockUser))

      setUser(mockUser)
      return { success: true }
    } catch (error) {
      console.log("Login error:", error)
      return { success: false, error: "Login failed. Please try again." }
    }
  }

  const register = async (name, email, password) => {
    try {
      const mockUser = {
        id: "123",
        name,
        email,
        membershipType: "Basic",
        membershipExpiry: "2024-12-31",
        visitsLeft: 10,
        totalVisits: 0,
      }

      await AsyncStorage.setItem("userToken", "dummy-auth-token")
      await AsyncStorage.setItem("userData", JSON.stringify(mockUser))

      setUser(mockUser)
      return { success: true }
    } catch (error) {
      console.log("Registration error:", error)
      return { success: false, error: "Registration failed. Please try again." }
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken")
      await AsyncStorage.removeItem("userData")
      setUser(null)
    } catch (error) {
      console.log("Logout error:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isLoading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

