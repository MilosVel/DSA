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