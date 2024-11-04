const prisma = require("../config/prisma");
const stripe = require("stripe")('sk_test_51QD9d5A0vBtZ0QDEUppZ2p8H8EYRxWt6eTgbuZGlOctj27OydCbebXDWC5rbEzAWOv1hGXxAUWGPl1qmeFAWqdyf00ADEbN7RY');

exports.payment = async (req, res) => {
  try {
    // ตรวจสอบว่า user มีอยู่จริงหรือไม่
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // ดึงข้อมูลตะกร้าสินค้าของ user
    const cart = await prisma.cart.findFirst({
      where: {

        orderedById: req.user.id,

      },
    });

    // ตรวจสอบว่าตะกร้าสินค้าถูกต้องหรือไม่

    if (!cart || !cart.cartTotal) {
      return res.status(400).json({ message: "Cart not found or total is missing" });
    }
    

    // คำนวณจำนวนเงินเป็นสตางค์
    const amountTHB = Math.round(cart.cartTotal * 100);

    // สร้าง PaymentIntent กับจำนวนเงินและสกุลเงิน
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountTHB,
      currency: "thb",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // ส่ง clientSecret กลับไปยัง client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (err) {
    console.error("Error during payment:", err);
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};
