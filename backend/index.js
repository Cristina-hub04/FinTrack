import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';


const app1 = express();
app1.use(cors());
app1.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, 
});

const openai = new OpenAIApi(configuration);


const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.json({ ok: true }));


app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { date: 'desc' },
    });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});


app.post('/api/transactions', async (req, res) => {
  try {
    const { description, amount, category, type, date } = req.body;
    const tx = await prisma.transaction.create({
      data: {
        description,
        amount: Number(amount),
        category,
        type,
        date: date ? new Date(date) : undefined,
      },
    });
    res.status(201).json(tx);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});


app.delete('/api/transactions/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.transaction.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

let transactions = []; 

app.post('/api/adviser', async (req, res) => {
  const { question } = req.body;

  const prompt = `You are a financial adviser AI. 
User's transactions: ${JSON.stringify(transactions, null, 2)}
Answer the question: ${question}`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    res.json({ answer: completion.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI response failed' });
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
