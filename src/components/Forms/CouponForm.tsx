import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CouponFormProps, FormPayload } from '../../types/CouponTypes';

interface FormErrors {
  code: string;
  discountRate: string;
  expirationDate: string;
  maxUsageLimit: string;
}

const CouponForm: React.FC<CouponFormProps> = ({ onSubmit, product, updateData, title }) => {
  const [discountType, setDiscountType] = useState<'percentage' | 'amount'>(updateData?.discountType || 'percentage');
  const [formData, setFormData] = useState<FormPayload>({
    code: updateData?.code || '',
    discountRate: updateData?.discountRate || 0,
    expirationDate: updateData?.expirationDate || '',
    maxUsageLimit: updateData?.maxUsageLimit || 0,
    discountType: updateData?.discountType || 'percentage',
    product: product
  });
  const [errors, setErrors] = useState<FormErrors>({
    code: '',
    discountRate: '',
    expirationDate: '',
    maxUsageLimit: ''
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      code: '',
      discountRate: '',
      expirationDate: '',
      maxUsageLimit: ''
    };
    let isValid = true;

    if (!formData.code) {
      newErrors.code = 'Code is required';
      isValid = false;
    }
    if (!formData.discountRate) {
      newErrors.discountRate = 'Discount rate is required';
      isValid = false;
    } else if (isNaN(Number(formData.discountRate))) {
      newErrors.discountRate = 'Discount rate must be a number';
      isValid = false;
    }
    if (!formData.expirationDate) {
      newErrors.expirationDate = 'Expiration date is required';
      isValid = false;
    }
    if (!formData.maxUsageLimit || isNaN(Number(formData.maxUsageLimit)) || Number(formData.maxUsageLimit) < 0) {
      newErrors.maxUsageLimit = 'Usage limit must be a non-negative number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (validateForm()) {
      const data: FormPayload = {
        ...formData,
        discountType,
        maxUsageLimit: formData.maxUsageLimit
      };
      onSubmit(data);
      if (!updateData) {
        clearForm();
      }
    }
  };

  const clearForm = (): void => {
    setFormData({
      code: '',
      discountRate: '',
      expirationDate: '',
      maxUsageLimit: 0,
      discountType: 'percentage',
      product: product
    });
    setDiscountType('percentage');
    setErrors({
      code: '',
      discountRate: '',
      expirationDate: '',
      maxUsageLimit: ''
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDiscountTypeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const newDiscountType = e.target.value as 'percentage' | 'amount';
    setDiscountType(newDiscountType);
    setFormData({ ...formData, discountType: newDiscountType });
  };

  return (
    <form id={`${title.split(' ').join('')}-form`} onSubmit={handleSubmit} className="w-[542px]">
      <div className="flex gap-2 flex-col items-start">
        <label htmlFor="code">Code</label>
        <input
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleInputChange}
          className={`text-sm outline-none w-full p-2 h-9 border ${
            errors.code ? 'border-red-500' : 'border-gray-300'
          } rounded bg-transparent`}
        />
        {errors.code && <span className="text-red-500 text-xs">{errors.code}</span>}
      </div>
      <div className="flex justify-between gap-4 mt-2">
        <div className="flex gap-2 flex-col items-start w-fit">
          <label htmlFor="discountType" className="whitespace-nowrap">
            Discount type
          </label>
          <select
            id="discountType"
            name="discountType"
            value={discountType}
            onChange={handleDiscountTypeChange}
            className="text-sm outline-none w-full pl-2 pr-4 h-9 border border-gray-300 rounded bg-transparent whitespace-nowrap"
          >
            <option value="percentage">Percentage</option>
            <option value="amount">Amount</option>
          </select>
        </div>

        <div className="flex gap-2 flex-col items-start w-4/5">
          <label htmlFor="discountRate">{discountType === 'percentage' ? 'Rate' : 'Amount'}</label>
          <input
            type="text"
            id="discountRate"
            name="discountRate"
            value={formData.discountRate}
            onChange={handleInputChange}
            className={`text-sm outline-none w-full p-2 h-9 border ${
              errors.discountRate ? 'border-red-500' : 'border-gray-300'
            } rounded bg-transparent`}
            placeholder={discountType === 'percentage' ? '20%' : '20 RWF'}
          />
          {errors.discountRate && <span className="text-red-500 text-xs">{errors.discountRate}</span>}
        </div>
      </div>

      <div className="flex gap-2 flex-col items-start my-2">
        <label htmlFor="expirationDate">Expiration Date</label>
        <input
          type="date"
          id="expirationDate"
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleInputChange}
          className={`text-sm outline-none w-full p-2 h-9 border ${
            errors.expirationDate ? 'border-red-500' : 'border-gray-300'
          } rounded bg-transparent flex items-center justify-center`}
        />
        {errors.expirationDate && <span className="text-red-500 text-xs">{errors.expirationDate}</span>}
      </div>
      <div className="flex gap-2 flex-col items-start my-2">
        <label htmlFor="maxUsageLimit">Usage Limit</label>
        <input
          type="number"
          id="maxUsageLimit"
          name="maxUsageLimit"
          value={formData.maxUsageLimit}
          onChange={handleInputChange}
          className={`text-sm outline-none w-full p-2 h-9 border ${
            errors.maxUsageLimit ? 'border-red-500' : 'border-gray-300'
          } rounded bg-transparent`}
          min="0"
        />
        {errors.maxUsageLimit && <span className="text-red-500 text-xs">{errors.maxUsageLimit}</span>}
      </div>
    </form>
  );
};

export default CouponForm;
