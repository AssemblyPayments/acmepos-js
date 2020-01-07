import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Checkoutnew from '../Checkoutnew/Checkoutnew';
import Refund from '../Refund/Refund';
import Order from '../Order/Order';
import ProductList from '../ProductList/ProductList';

type Props = {
  spi: any;
};

function Products({ spi }: Props) {
  const allProducts = [
    {
      categoryName: 'Burger',
      list: [
        {
          id: '101',
          name: 'Chicken burger',
          image: './images/chicken.jpg',
          price: '12',
        },
        {
          id: '102',
          name: 'Bacon burger',
          image: './images/bacon and cheese.png',
          price: '12',
        },
        {
          id: '103',
          name: 'Vegan burger',
          image: './images/vegan.jpg',
          price: '12',
        },
        {
          id: '104',
          name: 'Beef burger',
          image: './images/beef.png',
          price: '12',
        },
        {
          id: '105',
          name: 'Veggie burger',
          image: './images/veggie.jpg',
          price: '12',
        },
        {
          id: '106',
          name: 'Lamb burger',
          image: './images/lamb.jpg',
          price: '12',
        },
      ],
    },
    {
      categoryName: 'Sides',
      list: [
        {
          id: '201',
          name: 'Veggie Salad',
          image: './images/caesar.jpg',
          price: '7',
        },
        {
          id: '202',
          name: 'Caeser Salad',
          image: './images/salad.jpg',
          price: '7',
        },
        {
          id: '203',
          name: 'Small Fries',
          image: './images/small fries.jpg',
          price: '7',
        },
        {
          id: '204',
          name: 'Large Fries',
          image: './images/largefries.jpg',
          price: '7',
        },
      ],
    },
    {
      categoryName: 'Drinks',
      list: [
        {
          id: '301',
          name: 'Coke',
          image: './images/pepsi.jpg',
          price: '4',
        },
        {
          id: '302',
          name: 'Kombucha',
          image: './images/kombuch.jpg',
          price: '4',
        },
        {
          id: '303',
          name: 'Orange Juice',
          image: './images/orange juice.jpg',
          price: '1',
        },
      ],
    },
  ];

  const [shortlistedProducts, updateShortlistedProducts] = useState<any[]>([]);
  const [checkout, setCheckout] = useState(false);
  const [refund, setRefund] = useState(false);
  const [surchargeAmount, setSurchargeAmount] = useState(0);

  const handleProductClick = (id: string) => {
    console.log(`clicked ... ${id}`);
    const products = [...shortlistedProducts];

    // find the clicked product id in existing shortlisted products list
    let shortlistedId = -1;
    shortlistedProducts.forEach((p, index) => {
      if (p.id === id) {
        shortlistedId = index;
      }
    });
    console.log('shortlistedId', shortlistedId);

    // if clicked product found in shortlisted product list then increment the quantity
    if (shortlistedId > -1) {
      products[shortlistedId].quantity += 1;
    } else {
      // else find the clicked product details in allProducts array and insert it at top
      // of short listed product list.
      let clickedProduct: any;
      allProducts.forEach(c =>
        c.list.forEach(p => {
          if (p.id === id) {
            clickedProduct = p;
          }
        })
      );
      products.unshift({ ...clickedProduct, quantity: 1 }); // push item on top of array using `unshift`
    }

    updateShortlistedProducts(products);
  };

  function handleChangeProductQuantity(id: any, quantity: number) {
    console.log('Remove product', id);

    const products = [...shortlistedProducts];

    // find the clicked product id in existing shortlisted products list
    let shortlistedId = -1;
    shortlistedProducts.forEach((p, index) => {
      if (p.id === id) {
        shortlistedId = index;
      }
    });

    // if clicked product found in shortlisted product list then decrement the quantity
    if (shortlistedId > -1) {
      products[shortlistedId].quantity += quantity;
      // if the quantity reaches 0, then remove the product from shortlisted product
      if (products[shortlistedId].quantity === 0) {
        products.splice(shortlistedId, 1);
      }
    }

    updateShortlistedProducts(products);
  }

  function handleApplySurcharge(surcharge: number) {
    setSurchargeAmount(surcharge);
    // setShowSurcharge(false);
  }
  function handleCheckout() {
    console.log('checkout clicked');
    setCheckout(true);
  }
  function handleRefund() {
    console.log(refund);
    setRefund(true);
  }

  function handleNoThanks() {
    setCheckout(false);
    updateShortlistedProducts([]);
  }

  function handleCheckoutClosed() {
    setCheckout(false);
    setRefund(false);
  }

  return (
    <>
      <Row>
        <Col lg={8}>
          {allProducts.map(cat => (
            <ProductList
              key={cat.categoryName}
              category={cat}
              onProductClick={handleProductClick}
              allProducts={allProducts}
              shortlistedProducts={shortlistedProducts}
              updateShortlistedProducts={updateShortlistedProducts}
            />
          ))}
        </Col>
        <Col lg={4} className="order-sidebar">
          <Order
            list={shortlistedProducts}
            onChangeProductQuantity={handleChangeProductQuantity}
            onCheckout={handleCheckout}
            onRefund={handleRefund}
            handleApplySurcharge={handleApplySurcharge}
            surchargeAmount={surchargeAmount}
            setSurchargeAmount={setSurchargeAmount}
          />
          <Checkoutnew
            visible={checkout}
            list={shortlistedProducts}
            onClose={handleCheckoutClosed}
            onNoThanks={handleNoThanks}
            spi={spi}
            surchargeAmount={surchargeAmount}
            setSurchargeAmount={setSurchargeAmount}
          />
          <Refund visible={refund} onClose={handleCheckoutClosed} spi={spi} />
        </Col>
      </Row>
    </>
  );
}

export default Products;
