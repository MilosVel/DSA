// npx tsx .\ts\decorators\method.ts

function measureTime(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {

    // Make timing deterministic for the demo
    const _origNow = performance.now;
    let called = 0;
    (performance as any).now = () => (called++ === 0 ? 0 : 50);
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    // restore
    (performance as any).now = _origNow;
    console.log(`${propertyKey} executed in ${(end - start).toFixed(2)}ms`);
    return result;
  };
  return descriptor;
}

class DataProcessor {
  @measureTime
  processData(data: number[]): number[] {
    // Minimal deterministic work
    return data.map(x => x * 2);
  }
}

const processor = new DataProcessor();
processor.processData([1, 2, 3]);



// // 2. Method Authorization Decorator

type UserRole = 'admin' | 'editor' | 'viewer';

const currentUser = {
  id: 1,
  name: 'John Doe',
  roles: ['viewer'] as UserRole[]
};

function AllowedRoles(...allowedRoles: UserRole[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const hasPermission = allowedRoles.some(role => currentUser.roles.includes(role));
      if (!hasPermission) {
        throw new Error(`User ${currentUser.name} is not authorized to call ${propertyKey}`);
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

class DocumentService {
  @AllowedRoles('admin', 'editor', 'viewer')
  viewDocument(id: string) {
    console.log(`Viewing document ${id}`);
  }
  @AllowedRoles('admin', 'editor')
  deleteDocument(id: string) {
    console.log(`Document ${id} deleted`);
  }
}

const docService = new DocumentService();
try {
  docService.viewDocument('doc123');
  docService.deleteDocument('doc123');
} catch (error: any) {
  console.log(error.message);
}


//// 2.Deprecation Warning Decorator


function deprecated(message: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.warn(`Warning: ${propertyKey} is deprecated. ${message}`);
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

class PaymentService {
  @deprecated('Use processPaymentV2 instead')
  processPayment(amount: number, currency: string) {
    console.log(`Processing payment of ${amount} ${currency}`);
  }
  processPaymentV2(amount: number, currency: string) {
    console.log(`Processing payment v2 of ${amount} ${currency}`);
  }
}

const payment = new PaymentService();
payment.processPayment(100, 'USD');
payment.processPaymentV2(100, 'USD');