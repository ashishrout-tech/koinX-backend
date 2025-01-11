# KoinX Backend Assignment

---

## **Features**

1. **Background Service**:
   - Periodically fetches cryptocurrency data using a cron job at an interval of 2 hrs.
   - Stores data in the database for historical analysis.

2. **APIs**:
   - `/stats`: Retrieves the latest data for a specific cryptocurrency.
   - `/deviation`: Calculates and returns the standard deviation of the price of a cryptocurrency based on the last 100 records.

3. **Validation**:
   - Validates API inputs using the Zod library.

4. **Error Handling**:
   - Centralized error responses for consistency across APIs.

---

## **Endpoints**

### **Base URL**

The project is deployed on an Azure machine and is available at:

- **Base URL**: [http://4.240.98.127/](http://4.240.98.127/)

### **/stats API**

- **Description**: Fetches the latest data for the requested cryptocurrency.
- **Endpoint**: [http://4.240.98.127/stats](http://4.240.98.127/stats)
- **Example Usage**:

  ```bash
  http://4.240.98.127/stats?coin=bitcoin
  ```

- **Query Parameters**:
  - `coin`: Cryptocurrency name (e.g., `bitcoin`, `ethereum`, `matic-network`).
- **Sample Response**:
  
  ```json
  {
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
  }
  ```

### **/deviation API**

- **Description**: Calculates the standard deviation of the price for the requested cryptocurrency based on the last 100 records.
- **Endpoint**: [http://4.240.98.127/deviation](http://4.240.98.127/deviation)
- **Example Usage**:
  
  ```bash
  http://4.240.98.127/deviation?coin=bitcoin
  ```

- **Query Parameters**:
  - `coin`: Cryptocurrency name (e.g., `bitcoin`, `ethereum`, `matic-network`).
- **Sample Response**:
  
  ```json
  {
    "deviation": 4082.48
  }
  ```

---

## **Local Setup**

### **Prerequisites**

1. Node.js (v16 or above)
2. Typescript
3. MongoDB instance
4. Coin gecko API

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/ashishrout-tech/koinX-backend.git
   cd koinX-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file with the following variables:

   ```env
   MONGO_URI=<mongo connection string>
   COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
   COINGECKO_API_KEY=
   ```

4. Start the server in dev mode:

   ```bash
   npm run dev
   ```

---

## **Deployment**

The project is deployed on an Azure machine. It listens on port **80**.

- **Base URL**: [http://4.240.98.127/](http://4.240.98.127/)

---

## **Usage**

- Access the `/stats` API to fetch the latest cryptocurrency data.
  
  ```bash
  curl "http://4.240.98.127/stats?coin=bitcoin"
  ```

- Access the `/deviation` API to calculate the standard deviation of the cryptocurrency price.
  
  ```bash
  curl "http://4.240.98.127/deviation?coin=bitcoin"
  ```

---

## **License**

This project is licensed under the ISC License.
