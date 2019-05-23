const router = require('express').Router();
const budgetController = require('../../controllers/budgetController');

// Matches with "/api/budget"
router
  .route('/')
  .get(budgetController.findAll)
  .post(budgetController.create);
// .post(budgetController.insert);

// Matches with "/api/budget/:id"
router
  .route('/id/:id')
  .get(budgetController.findById)
  .put(budgetController.update)
  .delete(budgetController.remove);

// Matches with "/api/budget/category/:category"
router.route('/category/:category').get(budgetController.findAllByCategory);

router.route('/month').get(budgetController.monthField);

router.route('/sumbyincome').get(budgetController.sumByIncome);

router.route('/sumbymonth').get(budgetController.sumByMonth);

router.route('/sumbycategory').get(budgetController.sumByCategory);

router.route('/sumbymonthtrue').get(budgetController.sumByMonthTrue);

router.route('/sumbymonthfalse').get(budgetController.sumByMonthFalse);

// router.route('/delete-all-records').get(budgetController.deleteAll);

module.exports = router;
