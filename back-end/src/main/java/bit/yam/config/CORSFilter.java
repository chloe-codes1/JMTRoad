package bit.yam.config;

import java.io.IOException;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Configuration;

@Configuration
public class CORSFilter implements Filter{

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		System.out.println("필터링이 진행중입니다...");
		
		HttpServletResponse response = (HttpServletResponse) res;
		response.setHeader("Access-Control-Allow-Origin", "*"); //허용할 origin(요청 url) : "*"의 경우 모두 허용
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE"); //허용할 request http Method : ~
		response.setHeader("Access-Control-Max-Age", "3600"); //브라우저 캐시 시간(단위: 초) : 3600이면 최소 1시간 안에는 서버로 재요청 되지 않음.
        response.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, "
        		+ "Origin, Accept, Access-Control-Request-Method, Access-Control-Request-Headers");
        
        chain.doFilter(req, res);
		
	}
	
	public void init(FilterConfig filterConfig) {}
	public void destroy() {}
	
}
