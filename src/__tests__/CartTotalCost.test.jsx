import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CartTotalCost from '../Components/CartTotalCost.jsx';
import { ContextShop } from '../Context/ContextShop.jsx';

function renderWithContext(value) {
  return render(
    <ContextShop.Provider value={value}>
      <CartTotalCost />
    </ContextShop.Provider>
  );
}

describe('CartTotalCost', () => {
  it('displays formatted totals from context', () => {
    const contextValue = {
      currency: '$',
      Postage_fee: 5,
      GetCartTotal: () => 50,
      CartProducts: { '1': { M: { quantity: 2 } } },
      products: [{ _id: '1', price: 25 }]
    };

    renderWithContext(contextValue);

    expect(screen.getByText('Sub-total')).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getByText('Delivery Fee')).toBeInTheDocument();
    expect(screen.getByText('$5.00')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$55.00')).toBeInTheDocument();
  });
});
