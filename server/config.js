function readRequiredEnvVariable(variableName) {
  const value = process.env[variableName];
  if (!value) throw new Error(`Can not read the ${variableName} from the env variables`);
  return value;
}

function readOptionalEnvVariable(variableName) {
  return process.env[variableName];
}

const nodeEnv = readRequiredEnvVariable('NODE_ENV');

const config = {
  nodeEnv: nodeEnv,
  backendPort: parseInt(readRequiredEnvVariable('BACKEND_SERVER_PORT')),
  jwtRedirectUri: readRequiredEnvVariable('JWT_REDIRECT_URI'),
  dsOauthServer: readRequiredEnvVariable('JWT_DS_OAUTH_SERVER'),
  userId: readRequiredEnvVariable('JWT_USER_ID'),
  clientId: readRequiredEnvVariable('DS_CLIENT_ID'),
  clientSecret: readRequiredEnvVariable('DS_CLIENT_SECRET'),
  restApiEnv: readOptionalEnvVariable('DS_REST_API_ENV') || 'DEMO',
  targetAccountId: JSON.parse(readRequiredEnvVariable('TARGET_ACCOUNT_ID')),
  sessionSecret: readRequiredEnvVariable('SESSION_SECRET'),
  frontendHost:
    nodeEnv === 'development'
      ? readRequiredEnvVariable('ACG_CALLBACK_URL_DEV')
      : readRequiredEnvVariable('ACG_CALLBACK_URL_PROD'),

  companyName: readOptionalEnvVariable('COMPANY_NAME') || 'Tech Innovations LLC',
  companyState: readOptionalEnvVariable('COMPANY_STATE') || 'California',
  companyType: readOptionalEnvVariable('COMPANY_ENTITY_TYPE') || 'Limited Liability Company',
  stateLaw: readOptionalEnvVariable('STATE_LAW') || 'California Corporation Law',
  streetAddress: readOptionalEnvVariable('COMPANY_STREET_ADDRESS') || '1234 Innovation Drive',
  state: readOptionalEnvVariable('STATE') || 'CA',
  representativeName: readOptionalEnvVariable('REPRESENTATIVE_NAME') || 'John Doe',
};

module.exports = config;
