import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isValidDiscount', async: false })
export class IsValidDiscountConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (value === undefined || value === null) {
      return true;
    }
    return value >= 0 && value <= 100;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be between 0 and 100`;
  }
}
