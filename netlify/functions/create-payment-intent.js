// const stripe = require('stripe')('sk_test_51PfQVNJyX9kTwHpnjUMHCu9PTJQKOonafBQrPaj6jwSSgyHzKdCmlxNUHpkNMPfxw4v5aiihmN4wKtgvX5sZlSbE00m8ByMV3u');
// console.log('ARE YOU BEING TRIGGERD?????')

exports.handler = async (event) => {
    console.log(event)
    return {event}
    
};