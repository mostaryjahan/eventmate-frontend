"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { getHostedEvents } from "@/services/host/hostedEventManagement";
import { IEvent } from "@/types/event.interface";

const HostRevenue = () => {
  const [data, setData] = useState<{name: string, revenue: number}[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getHostedEvents();
      const events: IEvent[] = result?.data || [];
      
      const revenueData = events.map(e => ({
        name: e.name.substring(0, 15),
        revenue: (e._count?.participants || 0) * parseFloat(e.joiningFee)
      }));
      
      setData(revenueData);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-96 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#a11f65" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HostRevenue;