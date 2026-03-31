import { useState, useEffect } from "react";
import { api, InquiryData } from "@/src/lib/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Users, Eye, MessageSquare, TrendingUp, Mail } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    visitors: 0,
    inquiries: 0,
    properties: 0,
  });
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [visitorData, setVisitorData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getStats();
        setStats({
          visitors: data.visitors,
          inquiries: data.inquiries,
          properties: 3, // Static for now as properties aren't in the local DB yet
        });
        setInquiries(data.inquiryList || []);
        
        // Simple mock visitor data for the chart based on total count
        const mockData = [
          { name: "Mon", visits: Math.floor(data.visitors * 0.1) },
          { name: "Tue", visits: Math.floor(data.visitors * 0.15) },
          { name: "Wed", visits: Math.floor(data.visitors * 0.1) },
          { name: "Thu", visits: Math.floor(data.visitors * 0.2) },
          { name: "Fri", visits: Math.floor(data.visitors * 0.15) },
          { name: "Sat", visits: Math.floor(data.visitors * 0.2) },
          { name: "Sun", visits: Math.floor(data.visitors * 0.1) },
        ];
        setVisitorData(mockData);
      } catch (e) {
        console.error("Failed to fetch stats", e);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { title: "Total Visitors", value: stats.visitors, icon: Users, color: "text-blue-500" },
    { title: "Total Inquiries", value: stats.inquiries, icon: MessageSquare, color: "text-amber-500" },
    { title: "Active Listings", value: stats.properties, icon: Eye, color: "text-green-500" },
    { title: "Growth", value: "+12%", icon: TrendingUp, color: "text-purple-500" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2 italic serif">Admin <span className="text-amber-500">Analytics</span></h1>
        <p className="text-slate-400">Real-time performance metrics for lll Brother Construction.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-slate-800 ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
            <div className="text-sm text-slate-500 uppercase tracking-wider font-mono">{card.title}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-8 italic serif">Visitor Traffic</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b" }}
                  itemStyle={{ color: "#fbbf24" }}
                />
                <Bar dataKey="visits" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-8 italic serif">Engagement Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b" }}
                  itemStyle={{ color: "#fbbf24" }}
                />
                <Line type="monotone" dataKey="visits" stroke="#fbbf24" strokeWidth={3} dot={{ r: 6, fill: "#fbbf24" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
