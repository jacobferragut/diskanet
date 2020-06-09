import hashlib

from sqlalchemy import Column, types
from sqlalchemy.ext.declarative import declarative_base

base = declarative_base()

class Auth(base):
    '''
    user name: max str length = 80 and primary key
    pass_hash: md5 hash of user_name, salt, and password
    pass_salt: arbitrary string to harden hash
    '''
    __tablename__ = 'auth'
    user_id = Column(types.String(length=38), primary_key=True)
    user_name = Column(types.String(length=80))
    pass_hash = Column(types.String(length=32))
    pass_salt = Column(types.String(length=40), default='')

    def _compute_hash(self, password):
        '''
            Hash user_name, pass_salt, and password
        '''
        return hashlib.md5((self.user_name + '|' + self.pass_salt + '|' +
            password).encode()).hexdigest()

    def _set_hash(self, password):
        '''
            given knowns: user_name and pass_salt (compute and store pass_hash)
            Used for new users. Does not commit.
        '''
        self.pass_hash = self._compute_hash(password)
    def _check_password(self, password):
        '''
            check if password agrees with pass_hash and pass_salt
        '''
        return self.pass_hash == self._compute_hash(password)




