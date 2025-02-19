/* eslint-disable */
import { showAlert } from './alert.js';
const stripe = Stripe(
  'pk_test_51QtJBHHVaxRkNtbBfNE0Yc1nbiDtAHIaqtKCJLdu4197zxVVGKuZaTqQlPztJdSPcRL8WrUT7FcZrNkC1CndQUyy00H0fvIjgy',
);

const bookTour = async (tourId) => {
  try {
    // Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // Create checkout form + charge credit cart
    // console.log(session);
    await stripe.redirectToCheckout({
      sessionId: session.data.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

const bookBtn = document.getElementById('book-tour');
if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
