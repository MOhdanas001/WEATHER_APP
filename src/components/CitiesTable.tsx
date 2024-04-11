// CitiesTable.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CitiesTable: React.FC = () => {
  const [cities, setCities] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20`
      );
      setCities(response.data.records);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredCities = cities ? cities.filter(city =>
    city.city_name.toLowerCase().includes(search.toLowerCase())
  ) : [];

  return (
    <div>
      <input type="text" value={search} onChange={handleSearchChange} placeholder="Search city..." />
      <table>
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country</th>
            {/* Add more columns here */}
          </tr>
        </thead>
        <tbody>
          {filteredCities.map(city => (
            <tr key={city.recordid}>
              <td>
                <Link to={`/weather/${city.recordid}`}>{city.city_name}</Link>
              </td>
              <td>{city.country}</td>
              {/* Add more columns here */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CitiesTable;
