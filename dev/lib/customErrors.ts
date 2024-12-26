export class UserExistingError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "UserExistingError";
  }
}

export class CategoryExistingError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "CategoryExistingError";
  }
}
export class ProductExistingError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "ProductExistingError";
  }
}

export class ProductImagesBelowLimitError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "ProductImagesBelowLimitError";
  }
}

export class ImagesLengthError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "ImagesLengthError";
  }
}
export class SettingsPasswordInCorrect extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "SettingsPasswordInCorrect";
  }
}
