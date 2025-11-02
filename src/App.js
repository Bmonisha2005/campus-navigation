import React, { useState, useEffect } from 'react';
import { Search, Navigation, MapPin, Layers, ArrowRight, X, ChevronUp, ChevronDown } from 'lucide-react';
import './App.css';

function App() {
  const     [currentFloor, setCurrentFloor] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [fromRoom, setFromRoom] = useState(null);
  const [toRoom, setToRoom] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const floors = [
{
      name: "Ground Floor",
      number: 0,
      useCustomLayout: true,
      rooms: [
        { id: 1, name: "Transport Office", type: "office", gridPosition: { column: 2, row: 5 } },
        { id: 2, name: "Administrative Office", type: "office", gridPosition: { column: 2, row: 4 } },
        { id: 3, name: "Administrative Office", type: "office", gridPosition: { column: 2, row: 3 } },
        { id: 4, name: "Finance & General Account", type: "office", gridPosition: { column: 2, row: 2 } },
        { id: 5, name: "Auditor Office", type: "office", gridPosition: { column: 2, row: 1 } },
        { id: 6, name: "Xerox", type: "facility", gridPosition: { column: 3, row: 1 } },
        { id: 7, name: "Record Section", type: "office", gridPosition: { column: 4, row: 1 } },
        { id: 8, name: "Panel Board Room", type: "room", gridPosition: { column: 5, row: 1 } },
        { id: 9, name: "OPS Room", type: "office", gridPosition: { column: 6, row: 1 } },
        { id: "9.1", name: "Steps", type: "facility", gridPosition: { column: 7, row: 1 } },
        { id: "9.2", name: "Lift", type: "facility", gridPosition: { column: 8, row: 1 } },
        { id: 10, name: "BSNL Office", type: "office", gridPosition: { column: 9, row: 1 } },
        { id: 11, name: "Software Cell", type: "lab", gridPosition: { column: 10, row: 1 } },
        { id: 12, name: "Office", type: "office", gridPosition: { column: 11, row: 1 } },
        { id: 13, name: "Office", type: "office", gridPosition: { column: 11, row: 2 } },
        { id: 14, name: "Office", type: "office", gridPosition: { column: 11, row: 3 } },
        { id: 15, name: "Photo Studio", type: "facility", gridPosition: { column: 11, row: 4 } },
        { id: 16, name: "Office", type: "office", gridPosition: { column: 11, row: 5 } }
      ]
    },
    {
      name: "First Floor",
      number: 1,
      useCustomLayout: true,
      rooms: [
        { id: 17, name: "Library", type: "facility", gridPosition: { column: 2, rows: 5 } },
        { id: 18, name: "Dean Academic", type: "office", gridPosition: { column: 2, row: 2 } },
        { id: 19, name: "Seminar Hall", type: "hall", gridPosition: { column: 2, row: 1, columnSpan: 5 } },
        { id: "19.1", name: "Steps", type: "facility", gridPosition: { column: 7, row: 1 } },
        { id: "19.2", name: "Lift", type: "facility", gridPosition: { column: 8, row: 1 } },
        { id: 20, name: "HOD Room", type: "office", gridPosition: { column: 9, row: 1 } },
        { id: 21, name: "Staff Room", type: "room", gridPosition: { column: 10, row: 1 } },
        { id: 22, name: "Communication Lab", type: "lab", gridPosition: { column: 11, row: 1 } },
        { id: 23, name: "Restroom", type: "facility", gridPosition: { column: 12, row: 1 } },
        { id: 24, name: "3rd Year BSc Cyber Security", type: "classroom", gridPosition: { column: 12, row: 2 } },
        { id: 25, name: "2nd Year Cyber Security", type: "classroom", gridPosition: { column: 12, row: 3 } },
        { id: 26, name: "1st Year Cyber Security", type: "classroom", gridPosition: { column: 12, row: 4 } },
        { id: 27, name: "1st Year Cyber Security", type: "classroom", gridPosition: { column: 12, row: 5 } }
      ]
    },
    {
      name: "Second Floor",
      number: 2,
      useCustomLayout: true,
      rooms: [
        { id: 28, name: "1st Year CS-A", type: "classroom", gridPosition: { column: 1, row: 5 } },
        { id: 29, name: "1st Year CS-B", type: "classroom", gridPosition: { column: 1, row: 4 } },
        { id: 30, name: "1st Year CS-C", type: "classroom", gridPosition: { column: 1, row: 3 } },
        { id: 31, name: "1st Year CS-D", type: "classroom", gridPosition: { column: 1, row: 2 } },
        { id: 32, name: "Staff Room", type: "room", gridPosition: { column: 1, row: 1 } },
        { id: 33, name: "Internal Exam Center", type: "facility", gridPosition: { column: 2, row: 1 } },
        { id: 34, name: "2nd Year CS-A", type: "classroom", gridPosition: { column: 3, row: 1 } },
        { id: 35, name: "2nd Year CS-B", type: "classroom", gridPosition: { column: 4, row: 1 } },
        { id: 36, name: "2nd Year CS-C", type: "classroom", gridPosition: { column: 5, row: 1 } },
        { id: 37, name: "2nd Year CS-D", type: "classroom", gridPosition: { column: 6, row: 1 } },
        { id: "37.1", name: "Steps", type: "facility", gridPosition: { column: 7, row: 1 } },
        { id: "37.2", name: "Lift", type: "facility", gridPosition: { column: 8, row: 1 } },
        { id: 38, name: "Research Scholar", type: "office", gridPosition: { column: 9, row: 1 } },
        { id: 39, name: "Store Room", type: "facility", gridPosition: { column: 10, row: 1 } },
        { id: 40, name: "3rd Year CS-A", type: "classroom", gridPosition: { column: 11, row: 1 } },
        { id: 41, name: "3rd Year CS-B", type: "classroom", gridPosition: { column: 12, row: 1 } },
        { id: 42, name: "Restroom", type: "facility", gridPosition: { column: 13, row: 1 } },
        { id: 43, name: "3rd Year CS-C", type: "classroom", gridPosition: { column: 13, row: 2 } },
        { id: 44, name: "3rd Year CS-D", type: "classroom", gridPosition: { column: 13, row: 3 } },
        { id: 45, name: "1st Year AI & ML", type: "classroom", gridPosition: { column: 13, row: 4 } },
        { id: 46, name: "2nd Year AI & ML", type: "classroom", gridPosition: { column: 13, row: 5 } }
      ]
    },
    {
      name: "Third Floor",
      number: 3,
      useCustomLayout: true,
      rooms: [
        { id: 47, name: "3rd Year AI & ML", type: "classroom", gridPosition: { column: 1, row: 5 } },
        { id: 48, name: "1st Year AI & DS", type: "classroom", gridPosition: { column: 1, row: 4 } },
        { id: 49, name: "1st Year BCA-A", type: "classroom", gridPosition: { column: 1, row: 3 } },
        { id: 50, name: "1st Year BCA-B", type: "classroom", gridPosition: { column: 1, row: 2 } },
        { id: 51, name: "Staff Room", type: "room", gridPosition: { column: 1, row: 1 } },
        { id: 52, name: "System Engineer", type: "office", gridPosition: { column: 2, row: 1 } },
        { id: 53, name: "2nd Year BCA-A", type: "classroom", gridPosition: { column: 3, row: 1 } },
        { id: 54, name: "2nd Year BCA-B", type: "classroom", gridPosition: { column: 4, row: 1 } },
        { id: 55, name: "3rd Year BCA-A", type: "classroom", gridPosition: { column: 5, row: 1 } },
        { id: 56, name: "3rd Year BCA-B", type: "classroom", gridPosition: { column: 6, row: 1 } },
        { id: "56.1", name: "Stair Cases", type: "facility", gridPosition: { column: 7, row: 1 } },
        { id: "56.2", name: "Lift", type: "facility", gridPosition: { column: 8, row: 1 } },
        { id: 57, name: "Staff Room", type: "room", gridPosition: { column: 9, row: 1 } },
        { id: 58, name: "1st Year IT", type: "classroom", gridPosition: { column: 10, row: 1 } },
        { id: 59, name: "2nd Year IT", type: "classroom", gridPosition: { column: 11, row: 1 } },
        { id: 60, name: "Restroom", type: "facility", gridPosition: { column: 12, row: 1 } },
        { id: 61, name: "3rd Year IT", type: "classroom", gridPosition: { column: 12, row: 2 } },
        { id: 62, name: "3rd Year Data Science", type: "classroom", gridPosition: { column: 12, row: 3 } },
        { id: 63, name: "2nd Year Data Science", type: "classroom", gridPosition: { column: 12, row: 4 } },
        { id: 64, name: "1st Year Data Science", type: "classroom", gridPosition: { column: 12, row: 5 } }
      ]
    },
    {
      name: "Fourth Floor",
      number: 4,
      useCustomLayout: true,
      rooms: [
        { id: 65, name: "Lab-1 Laboratory", type: "lab", gridPosition: { column: 1, row: 3 } },
        { id: 66, name: "Lab-2 Laboratory", type: "lab", gridPosition: { column: 1, row: 2 } },
        { id: 67, name: "Lab-3 Laboratory", type: "lab", gridPosition: { column: 1, row: 1 } },
        { id: 68, name: "Lab-4 Laboratory", type: "lab", gridPosition: { column: 2, row: 1 } },
        { id: 69, name: "Lab-5 Laboratory", type: "lab", gridPosition: { column: 3, row: 1 } },
        { id: "69.1", name: "Stair", type: "facility", gridPosition: { column: 4, row: 1 } },
        { id: "69.2", name: "Lift", type: "facility", gridPosition: { column: 5, row: 1 } },
        { id: 70, name: "Lab-6 Laboratory", type: "lab", gridPosition: { column: 6, row: 1 } },
        { id: 71, name: "Lab-7 Laboratory", type: "lab", gridPosition: { column: 7, row: 1 } },
        { id: 72, name: "Lab-8 Laboratory", type: "lab", gridPosition: { column: 8, row: 1 } },
        { id: 73, name: "Lab-9 Laboratory", type: "lab", gridPosition: { column: 8, row: 2 } },
        { id: 74, name: "Lab-10 Laboratory", type: "lab", gridPosition: { column: 8, row: 3 } }
      ]
    }
  ];

  const allRooms = floors.flatMap(floor => 
    floor.rooms.map(room => ({ ...room, floor: floor.number, floorName: floor.name }))
  );

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allRooms.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.id.toString().includes(searchQuery)
      );
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms([]);
    }
  }, [searchQuery]);

  const getRoomColor = (type) => {
    const colors = {
      office: '#60a5fa',
      lab: '#c084fc',
      classroom: '#4ade80',
      facility: '#facc15',
      hall: '#f472b6',
      room: '#fb923c'
    };
    return colors[type] || '#9ca3af';
  };

  const generateDirections = (from, to) => {
    const directions = [];
    
    if (from.floor === to.floor) {
      directions.push(`You are on ${from.floorName}`);
      directions.push(`Starting from: ${from.name} (Room ${from.id})`);
      directions.push(`Walk along the corridor to Room ${to.id}`);
      directions.push(`Destination: ${to.name} (Room ${to.id})`);
    } else {
      directions.push(`Starting from: ${from.name} (Room ${from.id}) on ${from.floorName}`);
      directions.push(`Go to the nearest stairs or lift`);
      
      if (from.floor < to.floor) {
        directions.push(`Take ${to.floor - from.floor} floor(s) UP to ${to.floorName}`);
      } else {
        directions.push(`Take ${from.floor - to.floor} floor(s) DOWN to ${to.floorName}`);
      }
      
      directions.push(`Exit on ${to.floorName}`);
      directions.push(`Walk to Room ${to.id}`);
      directions.push(`Destination: ${to.name} (Room ${to.id})`);
    }
    
    return directions;
  };

  const handleNavigate = () => {
    if (fromRoom && toRoom) {
      setShowDirections(true);
    }
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setCurrentFloor(room.floor);
    setSearchQuery('');
    setFilteredRooms([]);
  };

  const renderCustomFloorPlan = (floor) => {
    let gridColumns = 8;
    let gridRows = 3;
    let corridorColumn = '2 / 8';
    let corridorRow = 2;
    
    if (floor.number === 0) {
      gridColumns = 12;
      gridRows = 5;
      corridorColumn = '3 / 11';
      corridorRow = 2;
    } else if (floor.number === 1) {
      gridColumns = 12;
      gridRows = 5;
      corridorColumn = '3 / 12';
      corridorRow = 2;
    } else if (floor.number === 2) {
      gridColumns = 12;
      gridRows = 5;
      corridorColumn = '2 / 13';
      corridorRow = 2;
    } else if (floor.number === 3) {
      gridColumns = 12;
      gridRows = 5;
      corridorColumn = '2 / 12';
      corridorRow = 2;
    }

    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`, 
        gridTemplateRows: `repeat(${gridRows}, 100px)`, 
        gap: '8px',
        padding: '20px',
        background: '#f9fafb',
        borderRadius: '8px',
        minHeight: '400px'
      }}>
        {floor.rooms.map((room) => {
          const pos = room.gridPosition;
          const isStairOrLift = room.name.includes('Stair') || room.name.includes('Lift') || room.name.includes('Steps');
          
          return (
            <div
              key={room.id}
              onClick={() => setSelectedRoom({...room, floor: floor.number, floorName: floor.name})}
              style={{
                gridColumn: pos.columnSpan ? `${pos.column} / span ${pos.columnSpan}` : pos.column,
                gridRow: pos.row,
                background: isStairOrLift
                  ? 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
                  : getRoomColor(room.type),
                border: '3px solid #333',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '0.85em',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                padding: '5px',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                e.currentTarget.style.zIndex = '10';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                e.currentTarget.style.zIndex = '1';
              }}
            >
              <div style={{ fontSize: '1em', fontWeight: 'bold' }}>{room.id}</div>
              <div style={{ fontSize: '0.65em', marginTop: '3px', opacity: 0.95, textAlign: 'center', lineHeight: '1.2' }}>
                {room.name.replace(' Laboratory', '')}
              </div>
            </div>
          );
        })}
        
        <div style={{
          gridColumn: corridorColumn,
          gridRow: corridorRow,
          background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
          border: '3px dashed #666',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.1em',
          color: '#333',
          fontWeight: 'bold',
          pointerEvents: 'none'
        }}>
          ← Corridor →
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)', padding: '1rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        
        <div style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '1rem' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#312e81', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <MapPin style={{ color: '#4f46e5' }} />
    Campus Indoor Navigation
  </h1>
  <h2 style={{ fontSize: '1.875rem', color: '#312e81', fontWeight: '600' }}>Jhansi Rani Block</h2>
</div>

          <p style={{ color: '#4b5563' }}>Find rooms instantly - Get directions</p>
        </div>

        <div style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '12px', color: '#9ca3af' }} size={20} />
            <input
              type="text"
              placeholder="      Search: CS-A, BCA, Library, Lab,Ds,It..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', paddingLeft: '40px', padding: '12px 16px', border: '2px solid #d1d5db', borderRadius: '8px', fontSize: '16px' }}
            />
          </div>
          
          {filteredRooms.length > 0 && (
            <div style={{ marginTop: '8px', maxHeight: '240px', overflowY: 'auto', border: '1px solid #d1d5db', borderRadius: '8px' }}>
              {filteredRooms.map((room) => (
                <button
                  key={`${room.floor}-${room.id}`}
                  onClick={() => handleRoomSelect(room)}
                  style={{ width: '100%', textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', background: 'white', cursor: 'pointer', border: 'none' }}
                >
                  <span style={{ fontWeight: '500' }}>{room.name} (Room {room.id})</span>
                  <span style={{ fontSize: '14px', color: '#4f46e5' }}>{room.floorName}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '1rem', marginBottom: '1rem' }}>
          <h3 style={{ fontWeight: '700', fontSize: '1.125rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Navigation size={20} style={{ color: '#4f46e5' }} />
            Get Directions
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>From:</label>
              <select
                value={fromRoom?.id || ''}
                onChange={(e) => setFromRoom(allRooms.find(r => r.id.toString() === e.target.value))}
                style={{ width: '100%', padding: '8px', border: '2px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
              >
                <option value="">Select starting point</option>
                {allRooms.map((room) => (
                  <option key={`from-${room.floor}-${room.id}`} value={room.id}>
                    {room.name} (Room {room.id})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>To:</label>
              <select
                value={toRoom?.id || ''}
                onChange={(e) => setToRoom(allRooms.find(r => r.id.toString() === e.target.value))}
                style={{ width: '100%', padding: '8px', border: '2px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}
              >
                <option value="">Select destination</option>
                {allRooms.map((room) => (
                  <option key={`to-${room.floor}-${room.id}`} value={room.id}>
                    {room.name} (Room {room.id})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleNavigate}
            disabled={!fromRoom || !toRoom}
            style={{ marginTop: '12px', width: '100%', backgroundColor: fromRoom && toRoom ? '#4f46e5' : '#d1d5db', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: '500', cursor: fromRoom && toRoom ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <ArrowRight size={20} />
            Get Directions
          </button>
        </div>

        {showDirections && fromRoom && toRoom && (
          <div style={{ background: 'linear-gradient(to right, #f0fdf4, #ecfdf5)', borderRadius: '8px', padding: '20px', marginBottom: '16px', border: '2px solid #86efac' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontWeight: '700', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#065f46' }}>
                <Navigation size={24} style={{ color: '#10b981' }} />
                Turn-by-Turn Directions
              </h3>
              <button onClick={() => setShowDirections(false)} style={{ background: 'white', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {generateDirections(fromRoom, toRoom).map((direction, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #d1d5db' }}>
                  <span style={{ backgroundColor: '#10b981', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', flexShrink: 0 }}>
                    {idx + 1}
                  </span>
                  <span style={{ color: '#1f2937', fontWeight: '500' }}>{direction}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontWeight: '700', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={20} style={{ color: '#4f46e5' }} />
              {floors[currentFloor].name}
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setCurrentFloor(Math.max(0, currentFloor - 1))}
                disabled={currentFloor === 0}
                style={{ padding: '8px', backgroundColor: currentFloor === 0 ? '#e5e7eb' : '#e0e7ff', borderRadius: '8px', border: 'none', cursor: currentFloor === 0 ? 'not-allowed' : 'pointer' }}
              >
                <ChevronDown size={20} />
              </button>
              <button
                onClick={() => setCurrentFloor(Math.min(floors.length - 1, currentFloor + 1))}
                disabled={currentFloor === floors.length - 1}
                style={{ padding: '8px', backgroundColor: currentFloor === floors.length - 1 ? '#e5e7eb' : '#e0e7ff', borderRadius: '8px', border: 'none', cursor: currentFloor === floors.length - 1 ? 'not-allowed' : 'pointer' }}
              >
                <ChevronUp size={20} />
              </button>
            </div>
          </div>

          {renderCustomFloorPlan(floors[currentFloor])}

          {selectedRoom && (
            <div style={{ marginTop: '16px', background: 'linear-gradient(to right, #eef2ff, #faf5ff)', padding: '16px', borderRadius: '8px', border: '2px solid #c7d2fe' }}>
              <h4 style={{ fontWeight: '700', marginBottom: '8px', color: '#4c1d95' }}>Room Details</h4>
              <p style={{ marginBottom: '4px' }}><strong>Room ID:</strong> {selectedRoom.id}</p>
              <p style={{ marginBottom: '4px' }}><strong>Name:</strong> {selectedRoom.name}</p>
              <p style={{ marginBottom: '4px' }}><strong>Type:</strong> {selectedRoom.type}</p>
              <p><strong>Floor:</strong> {selectedRoom.floorName}</p>
            </div>
          )}
        </div>

        <div style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '1rem' }}>
          <h3 style={{ fontWeight: '700', marginBottom: '12px' }}>Room Types Legend</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px' }}>
            {[
              { type: 'office', label: 'Office' },
              { type: 'lab', label: 'Laboratory' },
              { type: 'classroom', label: 'Classroom' },
              { type: 'facility', label: 'Facility' },
              { type: 'hall', label: 'Hall' },
              { type: 'room', label: 'Room' }
            ].map(({ type, label }) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: getRoomColor(type), borderRadius: '4px' }} />
                <span style={{ fontSize: '14px' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
