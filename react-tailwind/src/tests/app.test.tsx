import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../App';

describe('App interaction (React port)', () => {
  it('adds an item and shows it in the list', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(/Ponytail React/i)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/Nama item/i), { target: { value: 'Nasi Lemak' } });
    fireEvent.change(screen.getByLabelText(/Jumlah dalam Ringgit/i), { target: { value: '7.50' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah' }));

    expect(await screen.findByText('Nasi Lemak')).toBeInTheDocument();
    expect(screen.getByText('RM 7.50')).toBeInTheDocument();
  });

  it('rejects invalid submission', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(/Ponytail React/i)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/Nama item/i), { target: { value: '  ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah' }));

    expect(await screen.findByText(/nama dan jumlah yang sah/i)).toBeInTheDocument();
  });

  it('edits an existing item', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(/Ponytail React/i)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/Nama item/i), { target: { value: 'Air' } });
    fireEvent.change(screen.getByLabelText(/Jumlah dalam Ringgit/i), { target: { value: '2' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah' }));
    await screen.findByText('Air');

    fireEvent.click(screen.getByRole('button', { name: 'Edit Air' }));
    expect(screen.getByRole('button', { name: 'Simpan' })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Nama item/i), { target: { value: 'Air Mineral' } });
    fireEvent.click(screen.getByRole('button', { name: 'Simpan' }));

    expect(await screen.findByText('Air Mineral')).toBeInTheDocument();
  });

  it('confirms before deleting an item', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText(/Ponytail React/i)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/Nama item/i), { target: { value: 'Grab' } });
    fireEvent.change(screen.getByLabelText(/Jumlah dalam Ringgit/i), { target: { value: '12' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah' }));
    await screen.findByText('Grab');

    fireEvent.click(screen.getByRole('button', { name: 'Padam Grab' }));
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText(/tidak boleh dibatalkan/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Batal' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByText('Grab')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Padam Grab' }));
    fireEvent.click(screen.getByRole('button', { name: 'Padam' }));
    await waitFor(() => expect(screen.queryByText('Grab')).toBeNull());
  });

  it('persists across re-renders via localStorage', async () => {
    const { unmount } = render(<App />);
    await waitFor(() => expect(screen.getByText(/Ponytail React/i)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/Nama item/i), { target: { value: 'Teksi' } });
    fireEvent.change(screen.getByLabelText(/Jumlah dalam Ringgit/i), { target: { value: '30' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah' }));
    await screen.findByText('Teksi');

    unmount();
    render(<App />);
    expect(await screen.findByText('Teksi')).toBeInTheDocument();
  });
});