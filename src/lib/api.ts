export interface AnalyticsData {
  page: string;
  userAgent: string;
  timestamp?: string;
}

export interface InquiryData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  timestamp?: string;
}

export const api = {
  async login(username: string, password: string) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");
    return res.json();
  },

  async logout() {
    const res = await fetch("/api/logout", { method: "POST" });
    return res.json();
  },

  async getAuthStatus() {
    const res = await fetch("/api/auth-status");
    return res.json();
  },

  async logAnalytics(data: AnalyticsData) {
    const res = await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async submitInquiry(data: InquiryData) {
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getStats() {
    const res = await fetch("/api/stats");
    if (!res.ok) throw new Error("Unauthorized");
    return res.json();
  }
};
