/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import {
  Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography,
} from '@mui/material';

import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Calculator() {
  const [data, setData] = useState({
    homeValue: 3000,
    downPayment: 3000 * 0.2,
    loanAmount: 3000 * 0.8,
    interestRate: 5,
    loanTerm: 30,
  });
  const handleChange = (event) => {
    setData({
      ...data,
      loanTerm: event.target.value,
    });
  };

  const totalLoanMonth = data.loanTerm * 12;
  const interestPerMonth = data.interestRate / 100 / 12;
  const monthlyPayment = (
    data.loanAmount
        * interestPerMonth
            * (1 + interestPerMonth) ** totalLoanMonth)
            / ((1 + interestPerMonth) ** totalLoanMonth - 1);

  const totalInterestGenerated = monthlyPayment * totalLoanMonth - data.loanAmount;
  const pieChartData = {
    labels: ['Principle', 'Interest'],
    datasets: [
      {
        label: 'Ratio of Principle and Interest',
        data: [data.homeValue, totalInterestGenerated],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div>Calculator</div>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack gap={1}>
              <Typography variant="subtitle2"> Home Value</Typography>
              <Typography variant="h5"> ${data.homeValue}</Typography>
            </Stack>
            <Slider
              defaultValue={data.homeValue}
              min={100000}
              max={999999}
              aria-label="default"
              value={data.homeValue}
              marks
              step={10000}
              onChange={(e, value) => setData({
                ...data, downPayment: value * 0.2, loanAmount: value * 0.08, homeValue: value,
              })}
            />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">$100000</Typography>
              <Typography variant="caption" color="text.secondary">$999999</Typography>
            </Stack>
            <Typography>Down Payment</Typography>
            <Typography>${data.downPayment}</Typography>
            <Slider defaultValue={data.downPayment} min={0} max={900000} aria-label="default" value={data.downPayment} marks step={10000} onChange={(e, value) => setData({ ...data, loanAmount: (data.homeValue - value), downPayment: value })} />
            <Typography>Loan Amount</Typography>
            <Typography>${data.loanAmount}</Typography>
            <Slider defaultValue={data.loanAmount} min={0} max={999999} aria-label="default" value={data.loanAmount} marks step={1000} onChange={(e, value) => setData({ ...data, downPayment: (data.homeValue - value), loanAmount: value })} />
            <Typography>Interest Rate</Typography>
            <Typography>%{data.interestRate}</Typography>
            <Slider defaultValue={data.interestRate} min={0} max={10} aria-label="default" value={data.interestRate} marks step={1} onChange={(e, value) => setData({ ...data, interestRate: value })} />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tenure</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.loanTerm}
                label="Tenure"
                onChange={handleChange}
              >
                <MenuItem value={10}>10 years</MenuItem>
                <MenuItem value={20}>15 years</MenuItem>
                <MenuItem value={30}>30 years</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack gap={3}>
              <Typography textAlign="center" variant="h5"> Monthly Payment : ${monthlyPayment.toFixed(0)}</Typography>
              <Stack direction="row" justifyContent="center">
                <div>
                  <Pie data={pieChartData} />
                </div>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
