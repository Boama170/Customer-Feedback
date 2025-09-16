import { companies } from '@/data/companies';
import { Company } from '@/types/company';

export class CompanyService {
  private static instance: CompanyService;

  private constructor() {}

  static getInstance(): CompanyService {
    if (!CompanyService.instance) {
      CompanyService.instance = new CompanyService();
    }
    return CompanyService.instance;
  }

  async getCompanies(): Promise<Company[]> {
    // This can be replaced with an API call later
    const stored = typeof window !== 'undefined' ? localStorage.getItem('companies') : null;
    const storedCompanies = stored ? JSON.parse(stored) : [];
    return Promise.resolve([...companies, ...storedCompanies]);
  }

  async getCompanyBySlug(slug: string): Promise<Company | undefined> {
    // This can be replaced with an API call later
    const allCompanies = await this.getCompanies();
    return Promise.resolve(allCompanies.find(company => company.slug === slug));
  }

  async validateCompany(slug: string): Promise<boolean> {
    const company = await this.getCompanyBySlug(slug);
    return !!company;
  }
}