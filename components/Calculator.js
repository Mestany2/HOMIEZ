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
    homeValue: 150000,
    downPayment: 150000 * 0.2,
    loanAmount: 150000 * 0.8,
    interestRate: 5,
    loanTerm: 30,
  });
  const handleChange = (event) => {
    setData({
      ...data,
      loanTerm: event.target.value,
    });
  };

  const totalLoanMonths = data.loanTerm * 12;
  const interestPerMonth = data.interestRate / 100 / 12;
  const monthlyPayment = (
    data.loanAmount
        * interestPerMonth
            * (1 + interestPerMonth) ** totalLoanMonths)
            / ((1 + interestPerMonth) ** totalLoanMonths - 1);

  const totalInterestGenerated = monthlyPayment * totalLoanMonths - data.loanAmount;
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
      <Typography variant="h4" sx={{ color: 'white', mt: 3 }}>Mortgage Calculator</Typography>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack gap={1}>
              <Typography variant="subtitle2" sx={{ color: 'white' }}> Home Value</Typography>
              <Typography variant="h5" sx={{ color: 'white' }}> ${data.homeValue}</Typography>
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
                ...data, downPayment: value * 0.2, loanAmount: value * 0.8, homeValue: value,
              })}
            />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" color="gray">$100000</Typography>
              <Typography variant="caption" color="gray">$999999</Typography>
            </Stack>
            <Typography sx={{ color: 'white', mt: 4 }}>Down Payment</Typography>
            <Typography sx={{ color: 'white' }}>${data.downPayment}</Typography>
            <Slider defaultValue={data.downPayment} min={0} max={data.homeValue} aria-label="default" value={data.downPayment} marks step={10000} onChange={(e, value) => setData({ ...data, loanAmount: (data.homeValue - value), downPayment: value })} />
            <Typography sx={{ color: 'white', mt: 4 }}>Loan Amount</Typography>
            <Typography sx={{ color: 'white' }}>${data.loanAmount}</Typography>
            <Slider defaultValue={data.loanAmount} min={0} max={data.homeValue} aria-label="default" value={data.loanAmount} marks step={10000} onChange={(e, value) => setData({ ...data, downPayment: (data.homeValue - value), loanAmount: value })} />
            <Typography sx={{ color: 'white', mt: 4 }}>Interest Rate</Typography>
            <Typography sx={{ color: 'white' }}>%{data.interestRate}</Typography>
            <Slider defaultValue={data.interestRate} min={0} max={10} aria-label="default" value={data.interestRate} marks step={1} onChange={(e, value) => setData({ ...data, interestRate: value })} />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ color: 'white', mt: 4 }}>Tenure</InputLabel>
              <Select
                sx={{ color: 'white', mt: 4 }}
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
              <Typography textAlign="center" variant="h5" sx={{ color: 'white' }}> Monthly Payment : ${monthlyPayment.toFixed(0)}</Typography>
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
