import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const subscriptionData = [
  { date: "Day 1", count: 400 },
  { date: "Day 2", count: 300 },
  { date: "Day 3", count: 500 },
  { date: "Day 4", count: 700 },
  { date: "Day 5", count: 600 },
  { date: "Day 6", count: 800 },
  { date: "Day 7", count: 900 },
];

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 7000 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 8000 },
  { month: "Jul", revenue: 9000 },
  { month: "Aug", revenue: 10000 },
  { month: "Sep", revenue: 11000 },
  { month: "Oct", revenue: 12000 },
  { month: "Nov", revenue: 13000 },
  { month: "Dec", revenue: 14000 },
];

const Dashboard = () => {
  const [filteredData, setFilteredData] = useState(subscriptionData);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isHovered, setIsHovered] = useState(false);
  const containerStyle = {
    cursor: "pointer",
    boxShadow: isHovered ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
    transition: "box-shadow 0.3s ease-in-out",
    textAlign: "center",
    alignItems: "center",
  };

  const calculateTotalCount = (data) => {
    return data.reduce((total, current) => total + current.count, 0);
  };

  const totalCount = calculateTotalCount(filteredData);
  const calculateTotalRevenue = (data) => {
    return data.reduce((total, current) => total + current.revenue, 0);
  };
  const totalRevenue = calculateTotalRevenue(revenueData);

  const handleFilterChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = () => {
    const { start, end } = dateRange;
    const newData = subscriptionData.filter((data) => {
      const dayNumber = parseInt(data.date.split(" ")[1]);
      return dayNumber >= parseInt(start) && dayNumber <= parseInt(end);
    });
    setFilteredData(newData);
  };

  const resetData = () => {
    setFilteredData(subscriptionData);
    setDateRange({ start: "", end: "" });
  };

  return (
    <div>
      <div
        style={{
          fontSize: "20px",
          fontWeight: "650",
          marginBottom: "31px",
        }}
      >
        Dashboard
      </div>
      <div
        style={containerStyle}
        onClick={resetData}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.49999 1.77778C5.49999 1.31754 5.1269 0.944445 4.66666 0.944445C4.20642 0.944445 3.83333 1.31754 3.83333 1.77778V2.22962C3.56014 2.29356 3.30141 2.38303 3.05281 2.5097C2.2688 2.90917 1.63138 3.54659 1.23191 4.3306C0.980422 4.82417 0.875578 5.35766 0.825953 5.96504C0.777757 6.55493 0.777763 7.28339 0.777771 8.18654V9.81345C0.777763 10.7166 0.777757 11.4451 0.825953 12.035C0.875578 12.6423 0.980422 13.1758 1.23191 13.6694C1.63138 14.4534 2.2688 15.0908 3.05281 15.4903C3.54639 15.7418 4.07988 15.8466 4.68725 15.8963C5.27715 15.9445 6.0056 15.9445 6.90874 15.9444L10.6681 15.9444C11.0262 15.9445 11.27 15.9445 11.4849 15.9223C13.4464 15.7191 14.9968 14.1686 15.2 12.2071C15.2223 11.9922 15.2223 11.7484 15.2222 11.3904L15.2222 8.18653C15.2222 7.28339 15.2222 6.55493 15.174 5.96504C15.1244 5.35766 15.0196 4.82417 14.7681 4.3306C14.3686 3.54659 13.7312 2.90917 12.9472 2.5097C12.6986 2.38303 12.4399 2.29356 12.1667 2.22962V1.77778C12.1667 1.31754 11.7936 0.944445 11.3333 0.944445C10.8731 0.944445 10.5 1.31754 10.5 1.77778V2.0651C10.085 2.05555 9.61781 2.05555 9.09122 2.05556H6.90877C6.38217 2.05555 5.91497 2.05555 5.49999 2.0651V1.77778ZM3.80946 3.99471C4.02893 3.88288 4.31867 3.80607 4.82297 3.76487C5.33701 3.72287 5.99727 3.72222 6.94444 3.72222H9.05555C10.0027 3.72222 10.663 3.72287 11.177 3.76487C11.6813 3.80607 11.9711 3.88288 12.1905 3.99471C12.6609 4.23439 13.0434 4.61684 13.2831 5.08725C13.3949 5.30671 13.4717 5.59645 13.5129 6.10076C13.5293 6.30137 13.5394 6.52426 13.5456 6.77778H2.45439C2.4606 6.52426 2.47069 6.30137 2.48708 6.10076C2.52829 5.59645 2.6051 5.30671 2.71692 5.08725C2.95661 4.61684 3.33906 4.23439 3.80946 3.99471ZM2.44444 8.44445V9.77778C2.44444 10.7249 2.44509 11.3852 2.48708 11.8992C2.52829 12.4036 2.6051 12.6933 2.71692 12.9128C2.95661 13.3832 3.33906 13.7656 3.80946 14.0053C4.02893 14.1171 4.31867 14.1939 4.82297 14.2351C5.33701 14.2771 5.99727 14.2778 6.94444 14.2778H10.6175C11.0452 14.2778 11.1955 14.2767 11.3132 14.2645C12.4901 14.1426 13.4203 13.2123 13.5422 12.0354C13.5544 11.9177 13.5555 11.7674 13.5555 11.3397V8.44445H2.44444Z"
              fill="#4A4A4A"
            />
          </svg>
        </div>
        <div style={{ fontSize: "12px", fontWeight: "550" }}>Last 7 Days</div>
      </div>
      <div>
        <div>
          <div style={{ fontSize: "13px", fontWeight: "650" }}>
            Subscription
          </div>
          <div style={{ fontSize: "16px", fontWeight: "650" }}>
            {totalCount}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                type="linear"
                dataKey="count"
                stroke="pink"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <div style={{ fontSize: "13px", fontWeight: "650" }}>Revenue</div>
          <div style={{ fontSize: "16px", fontWeight: "650" }}>
            ${totalRevenue}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="pink" textAnchor="Dataset1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ paddingBottom: "30px" }}>
        <input
          type="number"
          name="start"
          placeholder="Ngày bắt đầu (ví dụ 1)"
          value={dateRange.start}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="end"
          placeholder="Ngày kết thúc (ví dụ 5)"
          value={dateRange.end}
          onChange={handleFilterChange}
          style={{ margin: "0 10px" }}
        />
        <button onClick={handleFilterSubmit}>Filter</button>
      </div>
    </div>
  );
};

export default Dashboard;
